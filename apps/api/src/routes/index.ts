import { Router } from 'express';
import healthRouter from './health.js';
import authRouter from './auth.js';
import bookingsRouter from './bookings.js';
import paymentsRouter from './payments.js';
import addonsRouter from './addons.js';
import spotsRouter from './spots.js';

const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/bookings', bookingsRouter);
apiRouter.use('/bookings', paymentsRouter);
apiRouter.use('/addons', addonsRouter);
apiRouter.use('/spots', spotsRouter);

export default apiRouter;
