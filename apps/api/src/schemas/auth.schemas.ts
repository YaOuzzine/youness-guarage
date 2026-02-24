import { z } from 'zod';

export const RegisterSchema = z.object({
  firstName: z.string().min(1).max(128),
  lastName: z.string().min(1).max(128),
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
  phone: z.string().max(32).optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
