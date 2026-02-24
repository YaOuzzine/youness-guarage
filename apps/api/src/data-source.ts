import 'reflect-metadata';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Booking } from './entities/Booking.js';
import { Addon } from './entities/Addon.js';
import { ParkingSpot } from './entities/ParkingSpot.js';
import { User } from './entities/User.js';
import { RefreshToken } from './entities/RefreshToken.js';

// Resolve .env from the monorepo root (3 levels up from src/ or dist/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..', '..');
config({ path: path.join(rootDir, '.env') });

// Detect whether we're running from compiled JS (dist/) or TS source (src/)
const isCompiledJs = __filename.endsWith('.js');
const migrationsGlob = isCompiledJs
  ? [path.join(__dirname, 'migrations', '*.js')]
  : [path.join(__dirname, 'migrations', '*.ts')];

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env['DATABASE_URL'],
  entities: [Booking, Addon, ParkingSpot, User, RefreshToken],
  migrations: migrationsGlob,
  synchronize: false,
  logging: process.env['NODE_ENV'] !== 'production',
});
