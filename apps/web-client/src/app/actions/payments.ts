'use server';

import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { user, paymentMethod } from '@/lib/db/schema';
import { getAuthUser } from '@/lib/auth';
import type {
  BillingInfoResponse,
  UpdateBillingInfoDto,
  PaymentMethodResponse,
  AddPaymentMethodDto,
} from '@youness-garage/shared';

// ── Billing Info ────────────────────────────────────

export async function getBillingInfo(): Promise<BillingInfoResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const [found] = await db
    .select({
      billingAddress: user.billingAddress,
      billingCity: user.billingCity,
      billingState: user.billingState,
      billingZip: user.billingZip,
      billingCountry: user.billingCountry,
      companyName: user.companyName,
      taxId: user.taxId,
    })
    .from(user)
    .where(eq(user.id, authUser.sub))
    .limit(1);

  if (!found) throw new Error('User not found');

  return {
    billingAddress: found.billingAddress ?? null,
    billingCity: found.billingCity ?? null,
    billingState: found.billingState ?? null,
    billingZip: found.billingZip ?? null,
    billingCountry: found.billingCountry ?? null,
    companyName: found.companyName ?? null,
    taxId: found.taxId ?? null,
  };
}

export async function updateBillingInfo(
  dto: UpdateBillingInfoDto,
): Promise<BillingInfoResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const updates: Record<string, string | null | Date> = {
    updatedAt: new Date(),
  };
  if (dto.billingAddress !== undefined) updates['billingAddress'] = dto.billingAddress || null;
  if (dto.billingCity !== undefined) updates['billingCity'] = dto.billingCity || null;
  if (dto.billingState !== undefined) updates['billingState'] = dto.billingState || null;
  if (dto.billingZip !== undefined) updates['billingZip'] = dto.billingZip || null;
  if (dto.billingCountry !== undefined) updates['billingCountry'] = dto.billingCountry || null;
  if (dto.companyName !== undefined) updates['companyName'] = dto.companyName || null;
  if (dto.taxId !== undefined) updates['taxId'] = dto.taxId || null;

  await db
    .update(user)
    .set(updates)
    .where(eq(user.id, authUser.sub));

  return getBillingInfo();
}

// ── Payment Methods ─────────────────────────────────

function toPaymentMethodResponse(
  row: typeof paymentMethod.$inferSelect,
): PaymentMethodResponse {
  return {
    id: row.id,
    last4: row.last4,
    brand: row.brand,
    expMonth: row.expMonth,
    expYear: row.expYear,
    isDefault: row.isDefault,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getPaymentMethods(): Promise<PaymentMethodResponse[]> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const rows = await db
    .select()
    .from(paymentMethod)
    .where(eq(paymentMethod.userId, authUser.sub));

  return rows.map(toPaymentMethodResponse);
}

export async function addPaymentMethod(
  dto: AddPaymentMethodDto,
): Promise<PaymentMethodResponse> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  // Check if user has any existing cards
  const existing = await db
    .select()
    .from(paymentMethod)
    .where(eq(paymentMethod.userId, authUser.sub));

  const isFirst = existing.length === 0;

  const [created] = await db
    .insert(paymentMethod)
    .values({
      userId: authUser.sub,
      last4: dto.last4,
      brand: dto.brand,
      expMonth: dto.expMonth,
      expYear: dto.expYear,
      isDefault: isFirst,
    })
    .returning();

  return toPaymentMethodResponse(created!);
}

export async function removePaymentMethod(id: string): Promise<void> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  const [found] = await db
    .select()
    .from(paymentMethod)
    .where(and(eq(paymentMethod.id, id), eq(paymentMethod.userId, authUser.sub)))
    .limit(1);

  if (!found) throw new Error('Payment method not found');

  await db
    .delete(paymentMethod)
    .where(eq(paymentMethod.id, id));

  // If deleted card was default, promote next card
  if (found.isDefault) {
    const remaining = await db
      .select()
      .from(paymentMethod)
      .where(eq(paymentMethod.userId, authUser.sub))
      .limit(1);

    if (remaining.length > 0) {
      await db
        .update(paymentMethod)
        .set({ isDefault: true })
        .where(eq(paymentMethod.id, remaining[0]!.id));
    }
  }
}

export async function setDefaultPaymentMethod(id: string): Promise<void> {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Not authenticated');

  // Verify ownership
  const [found] = await db
    .select()
    .from(paymentMethod)
    .where(and(eq(paymentMethod.id, id), eq(paymentMethod.userId, authUser.sub)))
    .limit(1);

  if (!found) throw new Error('Payment method not found');

  // Unset all defaults for this user
  await db
    .update(paymentMethod)
    .set({ isDefault: false })
    .where(eq(paymentMethod.userId, authUser.sub));

  // Set target as default
  await db
    .update(paymentMethod)
    .set({ isDefault: true })
    .where(eq(paymentMethod.id, id));
}
