/**
 * Thin facade that delegates to server actions.
 * Existing page imports continue to work without changes.
 */

import {
  login,
  register,
  logout,
  refreshSession,
  getMe,
} from '@/app/actions/auth';
import {
  createBooking as createBookingAction,
  getBooking as getBookingAction,
  checkoutBooking as checkoutBookingAction,
  getMyBookings,
} from '@/app/actions/bookings';
import { getAvailableSpots as getAvailableSpotsAction } from '@/app/actions/spots';
import type {
  BookingResponse,
  BookingStatus,
  CreateBookingDto,
  LoginDto,
  PaginatedResponse,
  ParkingSpotResponse,
  RegisterDto,
  UserResponse,
} from '@youness-garage/shared';

// ── Auth ──────────────────────────────────────────

export async function apiRegister(dto: RegisterDto): Promise<UserResponse> {
  return register(dto);
}

export async function apiLogin(dto: LoginDto): Promise<UserResponse> {
  return login(dto);
}

export async function apiRefresh(): Promise<UserResponse> {
  return refreshSession();
}

export async function apiLogout(): Promise<void> {
  return logout();
}

export async function apiGetMe(): Promise<UserResponse> {
  const user = await getMe();
  if (!user) throw new Error('Not authenticated');
  return user;
}

// ── Spots ─────────────────────────────────────────

export async function getAvailableSpots(
  checkIn: string,
  checkOut: string,
  type?: string,
): Promise<ParkingSpotResponse[]> {
  return getAvailableSpotsAction(checkIn, checkOut, type);
}

// ── Bookings ──────────────────────────────────────

export async function createBooking(
  dto: CreateBookingDto,
): Promise<BookingResponse> {
  return createBookingAction(dto);
}

export async function getBooking(id: string): Promise<BookingResponse> {
  const booking = await getBookingAction(id);
  if (!booking) throw new Error('Booking not found');
  return booking;
}

export async function checkoutBooking(id: string): Promise<BookingResponse> {
  return checkoutBookingAction(id);
}

export async function getBookings(params?: {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  from?: string;
  to?: string;
}): Promise<PaginatedResponse<BookingResponse>> {
  return getMyBookings(params);
}
