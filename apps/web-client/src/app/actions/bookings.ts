'use server';

import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { booking, addon, parkingSpot } from '@/lib/db/schema';
import { getAuthUser } from '@/lib/auth';
import type {
  BookingResponse,
  BookingStatus,
  CreateBookingDto,
  AddonResponse,
  PaginatedResponse,
  AddonType,
  AddonStatus,
} from '@youness-garage/shared';

// ── Mappers ──────────────────────────────────────────

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

function toBookingResponse(
  row: typeof booking.$inferSelect,
  addons: AddonResponse[],
): BookingResponse {
  return {
    id: row.id,
    userId: row.userId,
    guestName: row.guestName,
    guestEmail: row.guestEmail,
    guestPhone: row.guestPhone,
    licensePlate: row.licensePlate,
    vehicleMake: row.vehicleMake,
    vehicleModel: row.vehicleModel,
    checkIn: row.checkIn.toISOString(),
    checkOut: row.checkOut.toISOString(),
    spotNumber: row.spotNumber,
    status: row.status as BookingStatus,
    totalPrice: Number(row.totalPrice),
    stripePaymentIntentId: row.stripePaymentIntentId,
    addons,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

// ── Pricing ──────────────────────────────────────────

const DAILY_RATE_STANDARD = 15;
const DAILY_RATE_EV = 25;

function calculateDays(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ── Create Booking ───────────────────────────────────

export async function createBooking(
  dto: CreateBookingDto,
): Promise<BookingResponse> {
  const checkIn = new Date(dto.checkIn);
  const checkOut = new Date(dto.checkOut);
  const spotType = dto.spotType ?? 'STANDARD';

  // Find available spot
  const availableSpots = await db
    .select()
    .from(parkingSpot)
    .where(
      and(
        eq(parkingSpot.isAvailable, true),
        eq(parkingSpot.type, spotType),
        sql`${parkingSpot.id} NOT IN (
          SELECT ${booking.spotNumber} FROM ${booking}
          WHERE ${booking.spotNumber} IS NOT NULL
            AND ${booking.status} NOT IN ('CANCELLED', 'CHECKED_OUT')
            AND ${booking.checkIn} < ${checkOut.toISOString()}
            AND ${booking.checkOut} > ${checkIn.toISOString()}
        )`,
      ),
    )
    .limit(1);

  if (availableSpots.length === 0) {
    throw new Error('No available spots for the selected dates and type');
  }

  const spot = availableSpots[0]!;
  const days = calculateDays(checkIn, checkOut);
  const dailyRate = spotType === 'EV' ? DAILY_RATE_EV : DAILY_RATE_STANDARD;
  const totalPrice = days * dailyRate;

  // Get auth user if logged in
  const authUser = await getAuthUser();

  const [created] = await db
    .insert(booking)
    .values({
      userId: authUser?.sub ?? null,
      guestName: dto.guestName,
      guestEmail: dto.guestEmail,
      guestPhone: dto.guestPhone,
      licensePlate: dto.licensePlate,
      vehicleMake: dto.vehicleMake,
      vehicleModel: dto.vehicleModel,
      checkIn,
      checkOut,
      spotNumber: spot.id,
      status: 'PENDING',
      totalPrice: totalPrice.toFixed(2),
    })
    .returning();

  return toBookingResponse(created!, []);
}

// ── Get Booking ──────────────────────────────────────

export async function getBooking(id: string): Promise<BookingResponse | null> {
  const [found] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, id))
    .limit(1);

  if (!found) return null;

  const addons = await db
    .select()
    .from(addon)
    .where(eq(addon.bookingId, id));

  return toBookingResponse(found, addons.map(toAddonResponse));
}

// ── Get My Bookings ──────────────────────────────────

export async function getMyBookings(filters?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<PaginatedResponse<BookingResponse>> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 10;
  const offset = (page - 1) * limit;

  const conditions = [eq(booking.userId, authUser.sub)];
  if (filters?.status) {
    conditions.push(eq(booking.status, filters.status));
  }

  const where = and(...conditions);

  const [countResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(booking)
    .where(where);

  const total = countResult?.count ?? 0;

  const rows = await db
    .select()
    .from(booking)
    .where(where)
    .orderBy(desc(booking.createdAt))
    .limit(limit)
    .offset(offset);

  const data: BookingResponse[] = [];
  for (const row of rows) {
    const addons = await db
      .select()
      .from(addon)
      .where(eq(addon.bookingId, row.id));
    data.push(toBookingResponse(row, addons.map(toAddonResponse)));
  }

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// ── Get All Bookings (Admin) ─────────────────────────

export async function getAllBookings(filters?: {
  page?: number;
  limit?: number;
  status?: string;
  from?: string;
  to?: string;
}): Promise<PaginatedResponse<BookingResponse>> {
  const authUser = await getAuthUser();
  if (!authUser || authUser.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 10;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(booking.status, filters.status));
  }
  if (filters?.from) {
    conditions.push(gte(booking.checkIn, new Date(filters.from)));
  }
  if (filters?.to) {
    conditions.push(lte(booking.checkIn, new Date(filters.to)));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [countResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(booking)
    .where(where);

  const total = countResult?.count ?? 0;

  const rows = await db
    .select()
    .from(booking)
    .where(where)
    .orderBy(desc(booking.createdAt))
    .limit(limit)
    .offset(offset);

  const data: BookingResponse[] = [];
  for (const row of rows) {
    const addons = await db
      .select()
      .from(addon)
      .where(eq(addon.bookingId, row.id));
    data.push(toBookingResponse(row, addons.map(toAddonResponse)));
  }

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// ── Update Booking Status (Admin) ────────────────────

const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['CHECKED_IN', 'CANCELLED'],
  CHECKED_IN: ['CHECKED_OUT'],
  CHECKED_OUT: [],
  CANCELLED: [],
};

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<BookingResponse> {
  const authUser = await getAuthUser();
  if (!authUser || authUser.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const [found] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, id))
    .limit(1);

  if (!found) throw new Error('Booking not found');

  const allowed = VALID_TRANSITIONS[found.status] ?? [];
  if (!allowed.includes(status)) {
    throw new Error(
      `Cannot transition from ${found.status} to ${status}`,
    );
  }

  await db
    .update(booking)
    .set({ status, updatedAt: new Date() })
    .where(eq(booking.id, id));

  return (await getBooking(id))!;
}

// ── Cancel Booking (Admin) ───────────────────────────

export async function cancelBooking(id: string): Promise<BookingResponse> {
  return updateBookingStatus(id, 'CANCELLED' as BookingStatus);
}

// ── Checkout (Simulate Payment) ──────────────────────

export async function checkoutBooking(id: string): Promise<BookingResponse> {
  const [found] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, id))
    .limit(1);

  if (!found) throw new Error('Booking not found');
  if (found.status !== 'PENDING') {
    throw new Error('Booking is not in PENDING status');
  }

  await db
    .update(booking)
    .set({ status: 'CONFIRMED', updatedAt: new Date() })
    .where(eq(booking.id, id));

  return (await getBooking(id))!;
}
