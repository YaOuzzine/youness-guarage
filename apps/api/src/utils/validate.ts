import type { ZodSchema } from 'zod';
import { AppError } from '../middleware/errorHandler.js';

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    throw new AppError(400, message, 'Validation Error');
  }

  return result.data;
}
