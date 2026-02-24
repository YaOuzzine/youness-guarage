import type { AddonResponse } from './addon.js';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED = 'CANCELLED',
}

export interface CreateBookingDto {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  licensePlate: string;
  vehicleMake: string;
  vehicleModel: string;
  checkIn: string; // ISO 8601
  checkOut: string; // ISO 8601
  spotType?: 'STANDARD' | 'EV';
}

export interface BookingResponse {
  id: string;
  userId: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  licensePlate: string;
  vehicleMake: string;
  vehicleModel: string;
  checkIn: string;
  checkOut: string;
  spotNumber: number | null;
  status: BookingStatus;
  totalPrice: number;
  stripePaymentIntentId: string | null;
  addons: AddonResponse[];
  createdAt: string;
  updatedAt: string;
}
