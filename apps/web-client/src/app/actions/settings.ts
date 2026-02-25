'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { getAuthUser, verifyPassword, hashPassword } from '@/lib/auth';
import type {
  ChangePasswordDto,
  NotificationPrefsDto,
  NotificationPrefsResponse,
} from '@youness-garage/shared';

// ── Change Password ─────────────────────────────────

export async function changePassword(dto: ChangePasswordDto): Promise<void> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const [found] = await db
    .select()
    .from(user)
    .where(eq(user.id, authUser.sub))
    .limit(1);

  if (!found) throw new Error('User not found');

  const valid = await verifyPassword(dto.currentPassword, found.passwordHash);
  if (!valid) throw new Error('Current password is incorrect');

  const newHash = await hashPassword(dto.newPassword);

  await db
    .update(user)
    .set({ passwordHash: newHash, updatedAt: new Date() })
    .where(eq(user.id, authUser.sub));
}

// ── Notification Preferences ────────────────────────

export async function getNotificationPrefs(): Promise<NotificationPrefsResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const [found] = await db
    .select({
      notifyServiceUpdates: user.notifyServiceUpdates,
      notifyPromoOffers: user.notifyPromoOffers,
    })
    .from(user)
    .where(eq(user.id, authUser.sub))
    .limit(1);

  if (!found) throw new Error('User not found');

  return {
    serviceUpdates: found.notifyServiceUpdates,
    promoOffers: found.notifyPromoOffers,
  };
}

export async function updateNotificationPrefs(
  dto: NotificationPrefsDto,
): Promise<NotificationPrefsResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  await db
    .update(user)
    .set({
      notifyServiceUpdates: dto.serviceUpdates,
      notifyPromoOffers: dto.promoOffers,
      updatedAt: new Date(),
    })
    .where(eq(user.id, authUser.sub));

  return {
    serviceUpdates: dto.serviceUpdates,
    promoOffers: dto.promoOffers,
  };
}
