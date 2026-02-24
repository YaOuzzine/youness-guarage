import { Router } from 'express';
import type { ApiSuccessResponse, BookingResponse } from '@youness-garage/shared';
import { BookingStatus } from '@youness-garage/shared';
import { BookingService } from '../services/BookingService.js';

const router = Router();

/**
 * POST /api/bookings/:id/checkout
 *
 * Placeholder payment endpoint — simulates payment processing.
 * In production this would create a Stripe Checkout session.
 * For now it just confirms the booking after a short delay.
 */
router.post('/:id/checkout', async (req, res) => {
  const id = req.params['id'] as string;

  // Verify the booking exists and is in PENDING status
  const booking = await BookingService.findById(id);
  if (booking.status !== BookingStatus.PENDING) {
    res.status(422).json({
      statusCode: 422,
      message: `Booking is already ${booking.status}`,
      error: 'Unprocessable Entity',
    });
    return;
  }

  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Confirm the booking (simulates successful payment)
  const confirmed = await BookingService.updateStatus(id, BookingStatus.CONFIRMED);

  res.json({
    data: confirmed,
  } satisfies ApiSuccessResponse<BookingResponse>);
});

export default router;
