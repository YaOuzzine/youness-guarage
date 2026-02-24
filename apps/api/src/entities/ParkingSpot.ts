import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingSpotType } from '@youness-garage/shared';

@Entity({ name: 'parking_spot' })
export class ParkingSpot {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  label!: string;

  @Column({ type: 'boolean', default: true })
  isAvailable!: boolean;

  @Column({ type: 'varchar', length: 16, default: ParkingSpotType.STANDARD })
  type!: ParkingSpotType;
}
