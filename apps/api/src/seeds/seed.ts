import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source.js';
import { ParkingSpot } from '../entities/ParkingSpot.js';
import { Booking } from '../entities/Booking.js';
import { User } from '../entities/User.js';
import { ParkingSpotType, BookingStatus, UserRole } from '@youness-garage/shared';

async function seed(): Promise<void> {
  await AppDataSource.initialize();
  console.log('DataSource initialized.');

  const spotRepo = AppDataSource.getRepository(ParkingSpot);
  const bookingRepo = AppDataSource.getRepository(Booking);
  const userRepo = AppDataSource.getRepository(User);

  // --- Parking Spots (idempotent) ---
  const existingSpots = await spotRepo.count();
  if (existingSpots === 0) {
    const spots: Partial<ParkingSpot>[] = [];

    for (let i = 1; i <= 15; i++) {
      spots.push({
        label: `S-${String(i).padStart(2, '0')}`,
        isAvailable: true,
        type: ParkingSpotType.STANDARD,
      });
    }

    for (let i = 1; i <= 5; i++) {
      spots.push({
        label: `EV-${String(i).padStart(2, '0')}`,
        isAvailable: true,
        type: ParkingSpotType.EV,
      });
    }

    await spotRepo.save(spots);
    console.log(`Inserted ${spots.length} parking spots.`);
  } else {
    console.log(`Skipping spots — ${existingSpots} already exist.`);
  }

  // --- Sample Bookings (idempotent) ---
  const existingBookings = await bookingRepo.count();
  if (existingBookings === 0) {
    const now = Date.now();
    const day = 86_400_000;

    // Reload spots to get their IDs
    const allSpots = await spotRepo.find({ order: { id: 'ASC' } });
    const standardSpot = allSpots.find(
      (s) => s.type === ParkingSpotType.STANDARD,
    );
    const evSpot = allSpots.find((s) => s.type === ParkingSpotType.EV);

    const bookings: Partial<Booking>[] = [
      {
        guestName: 'Alice Johnson',
        guestEmail: 'alice@example.com',
        guestPhone: '+1-555-0101',
        licensePlate: 'ABC-1234',
        vehicleMake: 'Toyota',
        vehicleModel: 'Camry',
        checkIn: new Date(now + 3 * day),
        checkOut: new Date(now + 7 * day),
        spotNumber: standardSpot?.id ?? null,
        status: BookingStatus.CONFIRMED,
        totalPrice: 4 * 15, // 4 days × $15
      },
      {
        guestName: 'Bob Smith',
        guestEmail: 'bob@example.com',
        guestPhone: '+1-555-0202',
        licensePlate: 'XYZ-5678',
        vehicleMake: 'Tesla',
        vehicleModel: 'Model 3',
        checkIn: new Date(now + 5 * day),
        checkOut: new Date(now + 10 * day),
        spotNumber: evSpot?.id ?? null,
        status: BookingStatus.PENDING,
        totalPrice: 5 * 25, // 5 days × $25
      },
    ];

    await bookingRepo.save(bookings);
    console.log(`Inserted ${bookings.length} sample bookings.`);
  } else {
    console.log(`Skipping bookings — ${existingBookings} already exist.`);
  }

  // --- Admin User (idempotent) ---
  const adminEmail = 'admin@youness-garage.com';
  const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 12);
    const admin = userRepo.create({
      email: adminEmail,
      passwordHash,
      firstName: 'Admin',
      lastName: 'Youness',
      phone: null,
      role: UserRole.ADMIN,
    });
    await userRepo.save(admin);
    console.log(`Inserted admin user: ${adminEmail}`);
  } else {
    console.log(`Skipping admin user — already exists.`);
  }

  await AppDataSource.destroy();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
