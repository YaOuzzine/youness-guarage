import { Router } from 'express';
import type { ApiError } from '@youness-garage/shared';

const router = Router();

const notImplemented: ApiError = {
  statusCode: 501,
  message: 'Not implemented yet',
  error: 'Not Implemented',
};

router.all('/{*splat}', (_req, res) => {
  res.status(501).json(notImplemented);
});

export default router;
