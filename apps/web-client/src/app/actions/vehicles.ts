'use server';

import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { vehicle } from '@/lib/db/schema';
import { getAuthUser } from '@/lib/auth';
import type {
  VehicleResponse,
  CreateVehicleDto,
  UpdateVehicleDto,
} from '@youness-garage/shared';

function toResponse(row: typeof vehicle.$inferSelect): VehicleResponse {
  return {
    id: row.id,
    licensePlate: row.licensePlate,
    make: row.make,
    model: row.model,
    color: row.color,
    year: row.year,
    isDefault: row.isDefault,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getVehicles(): Promise<VehicleResponse[]> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const rows = await db
    .select()
    .from(vehicle)
    .where(eq(vehicle.userId, authUser.sub))
    .orderBy(vehicle.createdAt);

  return rows.map(toResponse);
}

export async function addVehicle(dto: CreateVehicleDto): Promise<VehicleResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  if (!dto.licensePlate || !dto.make || !dto.model) {
    throw new Error('License plate, make, and model are required');
  }

  // If this is the first vehicle, make it default
  const existing = await db
    .select({ id: vehicle.id })
    .from(vehicle)
    .where(eq(vehicle.userId, authUser.sub))
    .limit(1);

  const isFirst = existing.length === 0;

  const [inserted] = await db
    .insert(vehicle)
    .values({
      userId: authUser.sub,
      licensePlate: dto.licensePlate.toUpperCase(),
      make: dto.make,
      model: dto.model,
      color: dto.color || null,
      year: dto.year || null,
      isDefault: isFirst,
    })
    .returning();

  if (!inserted) throw new Error('Failed to add vehicle');
  return toResponse(inserted);
}

export async function updateVehicle(
  id: string,
  dto: UpdateVehicleDto,
): Promise<VehicleResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const [updated] = await db
    .update(vehicle)
    .set({
      ...(dto.licensePlate !== undefined && { licensePlate: dto.licensePlate.toUpperCase() }),
      ...(dto.make !== undefined && { make: dto.make }),
      ...(dto.model !== undefined && { model: dto.model }),
      ...(dto.color !== undefined && { color: dto.color || null }),
      ...(dto.year !== undefined && { year: dto.year || null }),
    })
    .where(and(eq(vehicle.id, id), eq(vehicle.userId, authUser.sub)))
    .returning();

  if (!updated) throw new Error('Vehicle not found');
  return toResponse(updated);
}

export async function removeVehicle(id: string): Promise<void> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const [deleted] = await db
    .delete(vehicle)
    .where(and(eq(vehicle.id, id), eq(vehicle.userId, authUser.sub)))
    .returning();

  if (!deleted) throw new Error('Vehicle not found');

  // If deleted vehicle was default, promote the next one
  if (deleted.isDefault) {
    const remaining = await db
      .select({ id: vehicle.id })
      .from(vehicle)
      .where(eq(vehicle.userId, authUser.sub))
      .orderBy(vehicle.createdAt)
      .limit(1);

    const next = remaining[0];
    if (next) {
      await db
        .update(vehicle)
        .set({ isDefault: true })
        .where(eq(vehicle.id, next.id));
    }
  }
}

export async function setDefaultVehicle(id: string): Promise<void> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  // Unset all defaults
  await db
    .update(vehicle)
    .set({ isDefault: false })
    .where(eq(vehicle.userId, authUser.sub));

  // Set target
  await db
    .update(vehicle)
    .set({ isDefault: true })
    .where(and(eq(vehicle.id, id), eq(vehicle.userId, authUser.sub)));
}
