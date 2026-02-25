'use server';

import { eq, and, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { parkingSpot, booking } from '@/lib/db/schema';
import type { ParkingSpotResponse } from '@youness-garage/shared';

function toSpotResponse(
  row: typeof parkingSpot.$inferSelect,
): ParkingSpotResponse {
  return {
    id: row.id,
    label: row.label,
    isAvailable: row.isAvailable,
    type: row.type as ParkingSpotResponse['type'],
  };
}

// ── Get All Spots ────────────────────────────────────

export async function getAllSpots(
  type?: string,
): Promise<ParkingSpotResponse[]> {
  const conditions = [];
  if (type) {
    conditions.push(eq(parkingSpot.type, type));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const rows = await db.select().from(parkingSpot).where(where);
  return rows.map(toSpotResponse);
}

// ── Get Available Spots ──────────────────────────────

export async function getAvailableSpots(
  checkIn: string,
  checkOut: string,
  type?: string,
): Promise<ParkingSpotResponse[]> {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const conditions = [
    eq(parkingSpot.isAvailable, true),
    sql`${parkingSpot.id} NOT IN (
      SELECT ${booking.spotNumber} FROM ${booking}
      WHERE ${booking.spotNumber} IS NOT NULL
        AND ${booking.status} NOT IN ('CANCELLED', 'CHECKED_OUT')
        AND ${booking.checkIn} < ${checkOutDate.toISOString()}
        AND ${booking.checkOut} > ${checkInDate.toISOString()}
    )`,
  ];

  if (type) {
    conditions.push(eq(parkingSpot.type, type));
  }

  const rows = await db
    .select()
    .from(parkingSpot)
    .where(and(...conditions));

  return rows.map(toSpotResponse);
}
