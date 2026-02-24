import type { Request, Response, NextFunction } from 'express';
import type { ApiError } from '@youness-garage/shared';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly error: string;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error ?? message;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toJSON(): ApiError {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.error,
    };
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(err.toJSON());
    return;
  }

  console.error('Unhandled error:', err);

  const isProduction = process.env['NODE_ENV'] === 'production';
  const body: ApiError = {
    statusCode: 500,
    message: isProduction ? 'Internal server error' : err.message,
    error: 'Internal server error',
  };
  res.status(500).json(body);
}
