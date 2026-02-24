import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { AddonStatus, AddonType } from '@youness-garage/shared';
import type { Booking } from './Booking.js';

const decimalTransformer = {
  to: (value: number): number => value,
  from: (value: string | null): number | null =>
    value === null ? null : parseFloat(value),
};

@Entity()
export class Addon {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  bookingId!: string;

  @ManyToOne('Booking', 'addons', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking!: Relation<Booking>;

  @Column({ type: 'varchar', length: 32 })
  type!: AddonType;

  @Column({ type: 'varchar', length: 32, default: AddonStatus.PENDING })
  status!: AddonStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  price!: number;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
