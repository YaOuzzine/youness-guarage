import {
  pgTable,
  uuid,
  varchar,
  boolean,
  integer,
  decimal,
  text,
  timestamp,
  serial,
} from 'drizzle-orm/pg-core';

// ── User ─────────────────────────────────────────────

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('passwordHash', { length: 255 }).notNull(),
  role: varchar('role', { length: 32 }).notNull().default('GUEST'),
  firstName: varchar('firstName', { length: 128 }).notNull(),
  lastName: varchar('lastName', { length: 128 }).notNull(),
  phone: varchar('phone', { length: 32 }),
  billingAddress: varchar('billingAddress', { length: 512 }),
  billingCity: varchar('billingCity', { length: 128 }),
  billingState: varchar('billingState', { length: 128 }),
  billingZip: varchar('billingZip', { length: 32 }),
  billingCountry: varchar('billingCountry', { length: 128 }),
  companyName: varchar('companyName', { length: 255 }),
  taxId: varchar('taxId', { length: 64 }),
  notifyServiceUpdates: boolean('notifyServiceUpdates').notNull().default(true),
  notifyPromoOffers: boolean('notifyPromoOffers').notNull().default(false),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
});

// ── PaymentMethod ───────────────────────────────────

export const paymentMethod = pgTable('payment_method', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  last4: varchar('last4', { length: 4 }).notNull(),
  brand: varchar('brand', { length: 32 }).notNull(),
  expMonth: integer('expMonth').notNull(),
  expYear: integer('expYear').notNull(),
  isDefault: boolean('isDefault').notNull().default(false),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
});

// ── Vehicle ───────────────────────────────────────────

export const vehicle = pgTable('vehicle', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  licensePlate: varchar('licensePlate', { length: 32 }).notNull(),
  make: varchar('make', { length: 128 }).notNull(),
  model: varchar('model', { length: 128 }).notNull(),
  color: varchar('color', { length: 64 }),
  year: integer('year'),
  isDefault: boolean('isDefault').notNull().default(false),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
});

// ── Booking ──────────────────────────────────────────

export const booking = pgTable('booking', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').references(() => user.id, { onDelete: 'set null' }),
  guestName: varchar('guestName', { length: 255 }).notNull(),
  guestEmail: varchar('guestEmail', { length: 255 }).notNull(),
  guestPhone: varchar('guestPhone', { length: 32 }).notNull(),
  licensePlate: varchar('licensePlate', { length: 32 }).notNull(),
  vehicleMake: varchar('vehicleMake', { length: 128 }).notNull(),
  vehicleModel: varchar('vehicleModel', { length: 128 }).notNull(),
  checkIn: timestamp('checkIn', { withTimezone: true }).notNull(),
  checkOut: timestamp('checkOut', { withTimezone: true }).notNull(),
  spotNumber: integer('spotNumber'),
  status: varchar('status', { length: 32 }).notNull().default('PENDING'),
  totalPrice: decimal('totalPrice', { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: varchar('stripePaymentIntentId', { length: 255 }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
});

// ── ParkingSpot ──────────────────────────────────────

export const parkingSpot = pgTable('parking_spot', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 16 }).notNull().unique(),
  isAvailable: boolean('isAvailable').notNull().default(true),
  type: varchar('type', { length: 16 }).notNull().default('STANDARD'),
});

// ── Addon ────────────────────────────────────────────

export const addon = pgTable('addon', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('bookingId')
    .notNull()
    .references(() => booking.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 32 }).notNull(),
  status: varchar('status', { length: 32 }).notNull().default('PENDING'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
});

// ── RefreshToken ─────────────────────────────────────

export const refreshToken = pgTable('refresh_token', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  tokenHash: varchar('tokenHash', { length: 64 }).notNull(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  isRevoked: boolean('isRevoked').notNull().default(false),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
});

// ── GarageConfig ────────────────────────────────────

export const garageConfig = pgTable('garage_config', {
  key: varchar('key', { length: 128 }).primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
});
