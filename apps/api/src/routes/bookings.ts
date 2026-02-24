import { Router } from 'express';
import type { ApiSuccessResponse } from '@youness-garage/shared';
import { validate } from '../utils/validate.js';
import {
  CreateBookingSchema,
  UpdateStatusSchema,
  BookingQuerySchema,
} from '../schemas/booking.schemas.js';
import { BookingService } from '../services/BookingService.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/bookings — create a booking and auto-assign a spot (public, optionally links to user)
router.post('/', async (req, res) => {
  const dto = validate(CreateBookingSchema, req.body);
  const userId = req.user?.sub ?? null;
  const booking = await BookingService.create(dto, userId);
  res.status(201).json({ data: booking } satisfies ApiSuccessResponse<typeof booking>);
});

// GET /api/bookings — list with pagination and filters (admin-only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const filters = validate(BookingQuerySchema, req.query);
  const result = await BookingService.findAll(filters);
  res.json(result);
});

// GET /api/bookings/:id — single booking detail (public — UUID acts as bearer)
router.get('/:id', async (req, res) => {
  const id = req.params['id'] as string;
  const booking = await BookingService.findById(id);
  res.json({ data: booking } satisfies ApiSuccessResponse<typeof booking>);
});

// PATCH /api/bookings/:id/status — transition status (admin-only)
router.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  const id = req.params['id'] as string;
  const { status } = validate(UpdateStatusSchema, req.body);
  const booking = await BookingService.updateStatus(id, status);
  res.json({ data: booking } satisfies ApiSuccessResponse<typeof booking>);
});

// DELETE /api/bookings/:id — cancel booking (admin-only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const id = req.params['id'] as string;
  const booking = await BookingService.cancel(id);
  res.json({ data: booking } satisfies ApiSuccessResponse<typeof booking>);
});

export default router;
