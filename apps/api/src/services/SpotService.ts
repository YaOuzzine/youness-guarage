import { BookingStatus, ParkingSpotType } from '@youness-garage/shared';
import { AppDataSource } from '../data-source.js';
import { ParkingSpot } from '../entities/ParkingSpot.js';
import { Booking } from '../entities/Booking.js';
import { AppError } from '../middleware/errorHandler.js';

const ACTIVE_STATUSES = [
  BookingStatus.PENDING,
  BookingStatus.CONFIRMED,
  BookingStatus.CHECKED_IN,
];

export class SpotService {
  static findAll(type?: ParkingSpotType): Promise<ParkingSpot[]> {
    const repo = AppDataSource.getRepository(ParkingSpot);
    return repo.find({
      where: type ? { type } : undefined,
      order: { id: 'ASC' },
    });
  }

  static async findAvailable(
    checkIn: Date,
    checkOut: Date,
    type?: ParkingSpotType,
  ): Promise<ParkingSpot[]> {
    const qb = AppDataSource.getRepository(ParkingSpot)
      .createQueryBuilder('spot')
      .where('spot.isAvailable = :available', { available: true });

    if (type) {
      qb.andWhere('spot.type = :type', { type });
    }

    // Exclude spots that have an overlapping active booking
    qb.andWhere((sqb) => {
      const sub = sqb
        .subQuery()
        .select('1')
        .from(Booking, 'b')
        .where('b.spotNumber = spot.id')
        .andWhere('b.status IN (:...statuses)', { statuses: ACTIVE_STATUSES })
        .andWhere('b.checkIn < :checkOut', { checkOut })
        .andWhere('b.checkOut > :checkIn', { checkIn })
        .getQuery();
      return `NOT EXISTS (${sub})`;
    });

    qb.orderBy('spot.id', 'ASC');

    return qb.getMany();
  }

  static async assign(
    checkIn: Date,
    checkOut: Date,
    type: ParkingSpotType,
  ): Promise<number> {
    const available = await SpotService.findAvailable(checkIn, checkOut, type);

    if (available.length === 0) {
      throw new AppError(
        409,
        `No available ${type} spots for the requested dates`,
        'Conflict',
      );
    }

    return available[0]!.id;
  }
}
