import { Router } from 'express';
import { ParkingSpotType } from '@youness-garage/shared';
import type { ApiSuccessResponse, ParkingSpotResponse } from '@youness-garage/shared';
import { validate } from '../utils/validate.js';
import { SpotAvailabilityQuerySchema } from '../schemas/booking.schemas.js';
import { SpotService } from '../services/SpotService.js';
import { toParkingSpotResponse } from '../mappers/spotMapper.js';

const router = Router();

// GET /api/spots — list all spots, optional type filter
router.get('/', async (req, res) => {
  const type = req.query['type'] as ParkingSpotType | undefined;
  const validType =
    type && Object.values(ParkingSpotType).includes(type) ? type : undefined;
  const spots = await SpotService.findAll(validType);
  const data = spots.map(toParkingSpotResponse);
  res.json({ data } satisfies ApiSuccessResponse<ParkingSpotResponse[]>);
});

// GET /api/spots/available — filter by date range and optional type
router.get('/available', async (req, res) => {
  const query = validate(SpotAvailabilityQuerySchema, req.query);
  const spots = await SpotService.findAvailable(
    new Date(query.checkIn),
    new Date(query.checkOut),
    query.type,
  );
  const data = spots.map(toParkingSpotResponse);
  res.json({ data } satisfies ApiSuccessResponse<ParkingSpotResponse[]>);
});

export default router;
