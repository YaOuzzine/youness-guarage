import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '@youness-garage/shared';
import { AppError } from './errorHandler.js';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

// Augment Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
}

/**
 * Soft auth — attaches req.user if a valid access token exists, never rejects.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const token = (req.cookies as Record<string, string | undefined>)['access_token'];
  if (!token) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(token, getJwtSecret()) as JwtPayload;
    req.user = payload;
  } catch {
    // Invalid/expired token — continue without user
  }

  next();
}

/**
 * Hard auth — returns 401 if no valid user.
 */
export function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    throw new AppError(401, 'Authentication required', 'Unauthorized');
  }
  next();
}

/**
 * Admin gate — returns 403 if user is not ADMIN.
 */
export function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    throw new AppError(401, 'Authentication required', 'Unauthorized');
  }
  if (req.user.role !== UserRole.ADMIN) {
    throw new AppError(403, 'Admin access required', 'Forbidden');
  }
  next();
}
