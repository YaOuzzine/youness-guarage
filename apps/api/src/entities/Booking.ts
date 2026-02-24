import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { BookingStatus } from '@youness-garage/shared';
import type { Addon } from './Addon.js';
import type { User } from './User.js';

const decimalTransformer = {
  to: (value: number): number => value,
  from: (value: string | null): number | null =>
    value === null ? null : parseFloat(value),
};

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  userId!: string | null;

  @ManyToOne('User', 'bookings', { onDelete: 'SET NULL', nullable: true })
  user!: Relation<User> | null;

  @Column({ type: 'varchar', length: 255 })
  guestName!: string;

  @Column({ type: 'varchar', length: 255 })
  guestEmail!: string;

  @Column({ type: 'varchar', length: 32 })
  guestPhone!: string;

  @Column({ type: 'varchar', length: 32 })
  licensePlate!: string;

  @Column({ type: 'varchar', length: 128 })
  vehicleMake!: string;

  @Column({ type: 'varchar', length: 128 })
  vehicleModel!: string;

  @Column({ type: 'timestamptz' })
  checkIn!: Date;

  @Column({ type: 'timestamptz' })
  checkOut!: Date;

  @Column({ type: 'int', nullable: true })
  spotNumber!: number | null;

  @Column({ type: 'varchar', length: 32, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  totalPrice!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripePaymentIntentId!: string | null;

  @OneToMany('Addon', 'booking', { cascade: true })
  addons!: Relation<Addon[]>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
