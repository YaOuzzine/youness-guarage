import cors from 'cors';

const rawOrigins = process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:3001';
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
