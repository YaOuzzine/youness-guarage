'use server';

import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { addon, booking } from '@/lib/db/schema';
import { getAuthUser } from '@/lib/auth';
import type {
  AddonResponse,
  AddonType,
  AddonStatus,
  CreateAddonDto,
} from '@youness-garage/shared';

const ADDON_PRICES: Record<string, number> = {
  CAR_WASH: 15,
  EV_CHARGING: 10,
};

function toAddonResponse(row: typeof addon.$inferSelect): AddonResponse {
  return {
    id: row.id,
    bookingId: row.bookingId,
    type: row.type as AddonType,
    status: row.status as AddonStatus,
    price: Number(row.price),
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export interface AddonWithBookingInfo extends AddonResponse {
  guestName: string;
  licensePlate: string;
  vehicleMake: string;
  vehicleModel: string;
  spotNumber: number | null;
}

// ── Create Addon ─────────────────────────────────────

export async function createAddon(
  bookingId: string,
  dto: CreateAddonDto,
): Promise<AddonResponse> {
  const price = ADDON_PRICES[dto.type] ?? 0;

  const [created] = await db
    .insert(addon)
    .values({
      bookingId,
      type: dto.type,
      status: 'PENDING',
      price: price.toFixed(2),
      notes: dto.notes ?? null,
    })
    .returning();

  // Update booking total price
  const addons = await db
    .select()
    .from(addon)
    .where(eq(addon.bookingId, bookingId));

  const addonTotal = addons.reduce((sum, a) => sum + Number(a.price), 0);

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1);

  if (bk) {
    const parkingPrice = Number(bk.totalPrice) - (addonTotal - price);
    const newTotal = parkingPrice + addonTotal;
    await db
      .update(booking)
      .set({ totalPrice: newTotal.toFixed(2), updatedAt: new Date() })
      .where(eq(booking.id, bookingId));
  }

  return toAddonResponse(created!);
}

// ── Get All Addons (Admin) ───────────────────────────

export async function getAllAddons(filters?: {
  status?: string;
  type?: string;
}): Promise<AddonWithBookingInfo[]> {
  const authUser = await getAuthUser();
  if (!authUser || authUser.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const rows = await db
    .select({
      addon: addon,
      guestName: booking.guestName,
      licensePlate: booking.licensePlate,
      vehicleMake: booking.vehicleMake,
      vehicleModel: booking.vehicleModel,
      spotNumber: booking.spotNumber,
    })
    .from(addon)
    .innerJoin(booking, eq(addon.bookingId, booking.id))
    .orderBy(desc(addon.createdAt));

  let results = rows.map((row) => ({
    ...toAddonResponse(row.addon),
    guestName: row.guestName,
    licensePlate: row.licensePlate,
    vehicleMake: row.vehicleMake,
    vehicleModel: row.vehicleModel,
    spotNumber: row.spotNumber,
  }));

  if (filters?.status) {
    results = results.filter((r) => r.status === filters.status);
  }
  if (filters?.type) {
    results = results.filter((r) => r.type === filters.type);
  }

  return results;
}

// ── Update Addon Status (Admin) ──────────────────────

const VALID_ADDON_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['IN_PROGRESS', 'DONE'],
  IN_PROGRESS: ['DONE'],
  DONE: [],
};

export async function updateAddonStatus(
  id: string,
  status: AddonStatus,
): Promise<AddonResponse> {
  const authUser = await getAuthUser();
  if (!authUser || authUser.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const [found] = await db
    .select()
    .from(addon)
    .where(eq(addon.id, id))
    .limit(1);

  if (!found) throw new Error('Addon not found');

  const allowed = VALID_ADDON_TRANSITIONS[found.status] ?? [];
  if (!allowed.includes(status)) {
    throw new Error(
      `Cannot transition addon from ${found.status} to ${status}`,
    );
  }

  await db
    .update(addon)
    .set({ status, updatedAt: new Date() })
    .where(eq(addon.id, id));

  const [updated] = await db
    .select()
    .from(addon)
    .where(eq(addon.id, id))
    .limit(1);

  return toAddonResponse(updated!);
}
