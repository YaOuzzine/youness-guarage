import type { ParkingSpotResponse } from '@youness-garage/shared';
import type { ParkingSpot } from '../entities/ParkingSpot.js';

export function toParkingSpotResponse(spot: ParkingSpot): ParkingSpotResponse {
  return {
    id: spot.id,
    label: spot.label,
    isAvailable: spot.isAvailable,
    type: spot.type,
  };
}
