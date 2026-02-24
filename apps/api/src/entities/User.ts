import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { UserRole } from '@youness-garage/shared';
import type { Booking } from './Booking.js';
import type { RefreshToken } from './RefreshToken.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 32, default: UserRole.GUEST })
  role!: UserRole;

  @Column({ type: 'varchar', length: 128 })
  firstName!: string;

  @Column({ type: 'varchar', length: 128 })
  lastName!: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone!: string | null;

  @OneToMany('Booking', 'user')
  bookings!: Relation<Booking[]>;

  @OneToMany('RefreshToken', 'user')
  refreshTokens!: Relation<RefreshToken[]>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
