import { z } from 'zod';
import { BookingStatus, ParkingSpotType } from '@youness-garage/shared';

export const CreateBookingSchema = z
  .object({
    guestName: z.string().min(1).max(255),
    guestEmail: z.string().email().max(255),
    guestPhone: z.string().min(1).max(32),
    licensePlate: z.string().min(1).max(32),
    vehicleMake: z.string().min(1).max(128),
    vehicleModel: z.string().min(1).max(128),
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    spotType: z.nativeEnum(ParkingSpotType).optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'checkOut must be after checkIn',
    path: ['checkOut'],
  });

export const UpdateStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus),
});

export const BookingQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.nativeEnum(BookingStatus).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export const SpotAvailabilityQuerySchema = z
  .object({
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    type: z.nativeEnum(ParkingSpotType).optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'checkOut must be after checkIn',
    path: ['checkOut'],
  });
