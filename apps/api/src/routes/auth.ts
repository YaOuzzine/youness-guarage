import { Router } from 'express';
import type { AuthResponse } from '@youness-garage/shared';
import type { ApiSuccessResponse } from '@youness-garage/shared';
import { validate } from '../utils/validate.js';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schemas.js';
import { AuthService } from '../services/AuthService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env['NODE_ENV'] === 'production',
  sameSite: process.env['NODE_ENV'] === 'production' ? 'none' as const : 'lax' as const,
  path: '/',
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const dto = validate(RegisterSchema, req.body);
  const user = await AuthService.register(dto);
  res.status(201).json({ data: { user } } satisfies ApiSuccessResponse<AuthResponse>);
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const dto = validate(LoginSchema, req.body);
  const { user, tokens } = await AuthService.login(dto);

  res.cookie('access_token', tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refresh_token', tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({ data: { user } } satisfies ApiSuccessResponse<AuthResponse>);
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  const refreshToken = (req.cookies as Record<string, string | undefined>)['refresh_token'];
  if (!refreshToken) {
    res.status(401).json({ statusCode: 401, message: 'No refresh token', error: 'Unauthorized' });
    return;
  }

  const { user, tokens } = await AuthService.refresh(refreshToken);

  res.cookie('access_token', tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refresh_token', tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ data: { user } } satisfies ApiSuccessResponse<AuthResponse>);
});

// POST /api/auth/logout
router.post('/logout', requireAuth, async (req, res) => {
  const refreshToken = (req.cookies as Record<string, string | undefined>)['refresh_token'];
  if (refreshToken) {
    await AuthService.logout(refreshToken);
  }

  res.clearCookie('access_token', COOKIE_OPTIONS);
  res.clearCookie('refresh_token', COOKIE_OPTIONS);

  res.json({ data: { message: 'Logged out' } } satisfies ApiSuccessResponse<{ message: string }>);
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  const user = await AuthService.getProfile(req.user!.sub);
  res.json({ data: { user } } satisfies ApiSuccessResponse<AuthResponse>);
});

export default router;
