import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source.js';
import { corsMiddleware } from './middleware/cors.js';
import { jsonMiddleware } from './middleware/json.js';
import { cookieParserMiddleware } from './middleware/cookieParser.js';
import { requestLogger } from './middleware/requestLogger.js';
import { authenticate } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

async function bootstrap(): Promise<void> {
  await AppDataSource.initialize();
  console.log('Database connection established');

  const app = express();

  // Middleware stack (order matters)
  app.use(corsMiddleware);
  app.use(jsonMiddleware);
  app.use(cookieParserMiddleware);
  app.use(requestLogger);
  app.use(authenticate);

  // Routes
  app.use('/api', apiRouter);

  // Error handler (must be 4-param for Express to recognize it)
  app.use(errorHandler);

  const port = parseInt(process.env['API_PORT'] ?? '4000', 10);
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start API server:', err);
  process.exit(1);
});
