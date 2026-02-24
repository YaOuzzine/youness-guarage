import type { AddonResponse, BookingResponse } from '@youness-garage/shared';
import type { Booking } from '../entities/Booking.js';
import type { Addon } from '../entities/Addon.js';

export function toAddonResponse(addon: Addon): AddonResponse {
  return {
    id: addon.id,
    bookingId: addon.bookingId,
    type: addon.type,
    status: addon.status,
    price: addon.price,
    notes: addon.notes,
    createdAt: addon.createdAt.toISOString(),
    updatedAt: addon.updatedAt.toISOString(),
  };
}

export function toBookingResponse(booking: Booking): BookingResponse {
  return {
    id: booking.id,
    userId: booking.userId,
    guestName: booking.guestName,
    guestEmail: booking.guestEmail,
    guestPhone: booking.guestPhone,
    licensePlate: booking.licensePlate,
    vehicleMake: booking.vehicleMake,
    vehicleModel: booking.vehicleModel,
    checkIn: booking.checkIn.toISOString(),
    checkOut: booking.checkOut.toISOString(),
    spotNumber: booking.spotNumber,
    status: booking.status,
    totalPrice: booking.totalPrice,
    stripePaymentIntentId: booking.stripePaymentIntentId,
    addons: (booking.addons ?? []).map(toAddonResponse),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
}
