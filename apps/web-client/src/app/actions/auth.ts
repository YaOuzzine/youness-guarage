'use server';

import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { user, refreshToken } from '@/lib/db/schema';
import {
  hashPassword,
  verifyPassword,
  createAccessToken,
  createRefreshToken,
  hashRefreshToken,
  setAuthCookies,
  clearAuthCookies,
  getAuthUser,
} from '@/lib/auth';
import type { JwtPayload } from '@/lib/auth';
import type {
  RegisterDto,
  LoginDto,
  UserResponse,
  UserRole,
} from '@youness-garage/shared';

function toUserResponse(row: typeof user.$inferSelect): UserResponse {
  return {
    id: row.id,
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone ?? null,
    role: row.role as UserRole,
    createdAt: row.createdAt.toISOString(),
  };
}

async function generateAndStoreTokens(
  payload: JwtPayload,
): Promise<void> {
  const accessToken = await createAccessToken(payload);
  const rawRefresh = createRefreshToken();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await db.insert(refreshToken).values({
    userId: payload.sub,
    tokenHash: hashRefreshToken(rawRefresh),
    expiresAt,
  });

  await setAuthCookies(accessToken, rawRefresh);
}

// ── Register ─────────────────────────────────────────

export async function register(
  dto: RegisterDto,
): Promise<UserResponse> {
  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, dto.email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error('Email already registered');
  }

  const hashed = await hashPassword(dto.password);

  const [created] = await db
    .insert(user)
    .values({
      email: dto.email,
      passwordHash: hashed,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone ?? null,
      role: 'GUEST',
    })
    .returning();

  return toUserResponse(created!);
}

// ── Login ────────────────────────────────────────────

export async function login(
  dto: LoginDto,
): Promise<UserResponse> {
  const [found] = await db
    .select()
    .from(user)
    .where(eq(user.email, dto.email))
    .limit(1);

  if (!found) {
    throw new Error('Invalid email or password');
  }

  const valid = await verifyPassword(dto.password, found.passwordHash);
  if (!valid) {
    throw new Error('Invalid email or password');
  }

  await generateAndStoreTokens({
    sub: found.id,
    email: found.email,
    role: found.role,
    firstName: found.firstName,
    lastName: found.lastName,
  });

  return toUserResponse(found);
}

// ── Logout ───────────────────────────────────────────

export async function logout(): Promise<void> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const rawRefresh = cookieStore.get('refresh_token')?.value;

  if (rawRefresh) {
    const tokenHash = hashRefreshToken(rawRefresh);
    await db
      .update(refreshToken)
      .set({ isRevoked: true })
      .where(eq(refreshToken.tokenHash, tokenHash));
  }

  await clearAuthCookies();
}

// ── Refresh Session ──────────────────────────────────

export async function refreshSession(): Promise<UserResponse> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const rawRefresh = cookieStore.get('refresh_token')?.value;

  if (!rawRefresh) {
    throw new Error('No refresh token');
  }

  const tokenHash = hashRefreshToken(rawRefresh);

  const [stored] = await db
    .select()
    .from(refreshToken)
    .where(
      and(
        eq(refreshToken.tokenHash, tokenHash),
        eq(refreshToken.isRevoked, false),
      ),
    )
    .limit(1);

  if (!stored || stored.expiresAt < new Date()) {
    await clearAuthCookies();
    throw new Error('Invalid or expired refresh token');
  }

  // Revoke old token
  await db
    .update(refreshToken)
    .set({ isRevoked: true })
    .where(eq(refreshToken.id, stored.id));

  // Fetch user
  const [found] = await db
    .select()
    .from(user)
    .where(eq(user.id, stored.userId))
    .limit(1);

  if (!found) {
    await clearAuthCookies();
    throw new Error('User not found');
  }

  // Issue new tokens
  await generateAndStoreTokens({
    sub: found.id,
    email: found.email,
    role: found.role,
    firstName: found.firstName,
    lastName: found.lastName,
  });

  return toUserResponse(found);
}

// ── Get Me ───────────────────────────────────────────

export async function getMe(): Promise<UserResponse | null> {
  const payload = await getAuthUser();
  if (!payload) return null;

  const [found] = await db
    .select()
    .from(user)
    .where(eq(user.id, payload.sub))
    .limit(1);

  if (!found) return null;
  return toUserResponse(found);
}

// ── Update Profile ───────────────────────────────────

export async function updateProfile(dto: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}): Promise<UserResponse> {
  const payload = await getAuthUser();
  if (!payload) throw new Error('Not authenticated');

  const updates: Record<string, string | null> = {};
  if (dto.firstName !== undefined) updates['firstName'] = dto.firstName;
  if (dto.lastName !== undefined) updates['lastName'] = dto.lastName;
  if (dto.phone !== undefined) updates['phone'] = dto.phone || null;

  if (Object.keys(updates).length > 0) {
    await db
      .update(user)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(user.id, payload.sub));
  }

  const [updated] = await db
    .select()
    .from(user)
    .where(eq(user.id, payload.sub))
    .limit(1);

  return toUserResponse(updated!);
}
