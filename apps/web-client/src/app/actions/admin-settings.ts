'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { garageConfig, user } from '@/lib/db/schema';
import { getAuthUser } from '@/lib/auth';

// ── Types (admin-only, not shared) ──────────────────

export interface GarageSettings {
  capacityStandard: number;
  capacityVip: number;
  capacityEv: number;
  capacityValet: number;
  automatedBarrier: boolean;
  pricingHourly: number;
  pricingDailyMax: number;
  pricingOvernightSurcharge: number;
  pricingLostTicketFee: number;
  pricingPeakHourSurge: boolean;
  pricingHolidayRates: boolean;
  serviceBasicWashPrice: number;
  serviceBasicWashEnabled: boolean;
  serviceEvChargePrice: number;
  serviceEvChargeEnabled: boolean;
  servicePremiumDetailPrice: number;
  servicePremiumDetailEnabled: boolean;
}

export interface StaffUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

// ── Defaults ────────────────────────────────────────

const DEFAULT_SETTINGS: GarageSettings = {
  capacityStandard: 450,
  capacityVip: 25,
  capacityEv: 12,
  capacityValet: 50,
  automatedBarrier: true,
  pricingHourly: 8,
  pricingDailyMax: 45,
  pricingOvernightSurcharge: 15,
  pricingLostTicketFee: 60,
  pricingPeakHourSurge: true,
  pricingHolidayRates: false,
  serviceBasicWashPrice: 25,
  serviceBasicWashEnabled: true,
  serviceEvChargePrice: 0.45,
  serviceEvChargeEnabled: true,
  servicePremiumDetailPrice: 150,
  servicePremiumDetailEnabled: false,
};

// ── Helpers ─────────────────────────────────────────

async function requireAdmin() {
  const authUser = await getAuthUser();
  if (!authUser || authUser.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return authUser;
}

function parseValue(key: string, raw: string): number | boolean {
  const defaultVal = DEFAULT_SETTINGS[key as keyof GarageSettings];
  if (typeof defaultVal === 'boolean') return raw === 'true';
  return Number(raw);
}

function serializeValue(val: number | boolean): string {
  return String(val);
}

// ── Actions ─────────────────────────────────────────

export async function getGarageSettings(): Promise<GarageSettings> {
  await requireAdmin();

  const rows = await db.select().from(garageConfig);
  const dbMap = new Map(rows.map((r) => [r.key, r.value]));

  const settings = { ...DEFAULT_SETTINGS };
  for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof GarageSettings)[]) {
    const raw = dbMap.get(key);
    if (raw !== undefined) {
      (settings as Record<string, number | boolean>)[key] = parseValue(key, raw);
    }
  }

  return settings;
}

export async function updateGarageSettings(
  partial: Partial<GarageSettings>,
): Promise<void> {
  await requireAdmin();

  const entries = Object.entries(partial).filter(
    ([key]) => key in DEFAULT_SETTINGS,
  );

  if (entries.length === 0) return;

  for (const [key, value] of entries) {
    const serialized = serializeValue(value as number | boolean);
    await db
      .insert(garageConfig)
      .values({ key, value: serialized, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: garageConfig.key,
        set: { value: serialized, updatedAt: new Date() },
      });
  }
}

export async function getStaffUsers(): Promise<StaffUser[]> {
  await requireAdmin();

  const rows = await db
    .select({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.role, 'ADMIN'));

  return rows.map((r) => ({
    id: r.id,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    role: r.role,
    createdAt: r.createdAt.toISOString(),
  }));
}
