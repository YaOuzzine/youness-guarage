import {
  BookingStatus,
  ParkingSpotType,
} from '@youness-garage/shared';
import type {
  CreateBookingDto,
  BookingResponse,
  PaginatedResponse,
} from '@youness-garage/shared';
import { AppDataSource } from '../data-source.js';
import { Booking } from '../entities/Booking.js';
import { AppError } from '../middleware/errorHandler.js';
import { SpotService } from './SpotService.js';
import { toBookingResponse } from '../mappers/bookingMapper.js';

const MS_PER_DAY = 86_400_000;

const DAILY_RATES: Record<ParkingSpotType, number> = {
  [ParkingSpotType.STANDARD]: 15,
  [ParkingSpotType.EV]: 25,
};

/** Valid status transitions: fromStatus → allowed target statuses */
const VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.PENDING]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED],
  [BookingStatus.CONFIRMED]: [
    BookingStatus.CHECKED_IN,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.CHECKED_IN]: [
    BookingStatus.CHECKED_OUT,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.CHECKED_OUT]: [],
  [BookingStatus.CANCELLED]: [],
};

export interface BookingFilters {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  from?: string;
  to?: string;
}

export class BookingService {
  static async create(dto: CreateBookingDto, userId?: string | null): Promise<BookingResponse> {
    const repo = AppDataSource.getRepository(Booking);

    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);
    const spotType = dto.spotType
      ? (dto.spotType as ParkingSpotType)
      : ParkingSpotType.STANDARD;

    const spotId = await SpotService.assign(checkIn, checkOut, spotType);

    const diffMs = checkOut.getTime() - checkIn.getTime();
    const days = Math.ceil(diffMs / MS_PER_DAY);
    const totalPrice = days * DAILY_RATES[spotType];

    const booking = repo.create({
      userId: userId ?? null,
      guestName: dto.guestName,
      guestEmail: dto.guestEmail,
      guestPhone: dto.guestPhone,
      licensePlate: dto.licensePlate,
      vehicleMake: dto.vehicleMake,
      vehicleModel: dto.vehicleModel,
      checkIn,
      checkOut,
      spotNumber: spotId,
      totalPrice,
    });

    const saved = await repo.save(booking);

    // Reload with addons relation
    const full = await repo.findOneOrFail({
      where: { id: saved.id },
      relations: ['addons'],
    });

    return toBookingResponse(full);
  }

  static async findAll(
    filters: BookingFilters,
  ): Promise<PaginatedResponse<BookingResponse>> {
    const repo = AppDataSource.getRepository(Booking);
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;

    const qb = repo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.addons', 'addon');

    if (filters.status) {
      qb.andWhere('booking.status = :status', { status: filters.status });
    }

    if (filters.from) {
      qb.andWhere('booking.checkIn >= :from', { from: filters.from });
    }

    if (filters.to) {
      qb.andWhere('booking.checkOut <= :to', { to: filters.to });
    }

    qb.orderBy('booking.createdAt', 'DESC');
    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [bookings, total] = await qb.getManyAndCount();

    return {
      data: bookings.map(toBookingResponse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async findById(id: string): Promise<BookingResponse> {
    const repo = AppDataSource.getRepository(Booking);

    const booking = await repo.findOne({
      where: { id },
      relations: ['addons'],
    });

    if (!booking) {
      throw new AppError(404, `Booking ${id} not found`, 'Not Found');
    }

    return toBookingResponse(booking);
  }

  static async updateStatus(
    id: string,
    newStatus: BookingStatus,
  ): Promise<BookingResponse> {
    const repo = AppDataSource.getRepository(Booking);

    const booking = await repo.findOne({
      where: { id },
      relations: ['addons'],
    });

    if (!booking) {
      throw new AppError(404, `Booking ${id} not found`, 'Not Found');
    }

    const allowed = VALID_TRANSITIONS[booking.status];
    if (!allowed.includes(newStatus)) {
      throw new AppError(
        422,
        `Cannot transition from ${booking.status} to ${newStatus}`,
        'Unprocessable Entity',
      );
    }

    booking.status = newStatus;
    await repo.save(booking);

    return toBookingResponse(booking);
  }

  static async cancel(id: string): Promise<BookingResponse> {
    return BookingService.updateStatus(id, BookingStatus.CANCELLED);
  }
}
