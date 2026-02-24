import { createHash, randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { RegisterDto, LoginDto, UserResponse } from '@youness-garage/shared';
import { UserRole } from '@youness-garage/shared';
import { AppDataSource } from '../data-source.js';
import { User } from '../entities/User.js';
import { RefreshToken } from '../entities/RefreshToken.js';
import { AppError } from '../middleware/errorHandler.js';
import { toUserResponse } from '../mappers/userMapper.js';
import type { JwtPayload } from '../middleware/auth.js';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

function getJwtSecret(): string {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async register(dto: RegisterDto): Promise<UserResponse> {
    const repo = AppDataSource.getRepository(User);

    const existing = await repo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new AppError(409, 'Email already registered', 'Conflict');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = repo.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone ?? null,
      role: UserRole.GUEST,
    });

    const saved = await repo.save(user);
    return toUserResponse(saved);
  }

  static async login(dto: LoginDto): Promise<{ user: UserResponse; tokens: TokenPair }> {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new AppError(401, 'Invalid email or password', 'Unauthorized');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new AppError(401, 'Invalid email or password', 'Unauthorized');
    }

    const tokens = await AuthService.generateTokens(user);
    return { user: toUserResponse(user), tokens };
  }

  static async generateTokens(user: User): Promise<TokenPair> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, getJwtSecret(), {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = randomBytes(40).toString('hex');
    const tokenHash = hashToken(refreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    const rtRepo = AppDataSource.getRepository(RefreshToken);
    const rt = rtRepo.create({
      userId: user.id,
      tokenHash,
      expiresAt,
    });
    await rtRepo.save(rt);

    return { accessToken, refreshToken };
  }

  static async refresh(oldRefreshToken: string): Promise<{ user: UserResponse; tokens: TokenPair }> {
    const rtRepo = AppDataSource.getRepository(RefreshToken);
    const userRepo = AppDataSource.getRepository(User);

    const tokenHash = hashToken(oldRefreshToken);

    const storedToken = await rtRepo.findOne({ where: { tokenHash } });
    if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
      if (storedToken && !storedToken.isRevoked) {
        // Expired — revoke it
        storedToken.isRevoked = true;
        await rtRepo.save(storedToken);
      }
      throw new AppError(401, 'Invalid or expired refresh token', 'Unauthorized');
    }

    // Revoke old token (rotation)
    storedToken.isRevoked = true;
    await rtRepo.save(storedToken);

    const user = await userRepo.findOne({ where: { id: storedToken.userId } });
    if (!user) {
      throw new AppError(401, 'User not found', 'Unauthorized');
    }

    const tokens = await AuthService.generateTokens(user);
    return { user: toUserResponse(user), tokens };
  }

  static async logout(refreshToken: string): Promise<void> {
    const rtRepo = AppDataSource.getRepository(RefreshToken);
    const tokenHash = hashToken(refreshToken);

    const storedToken = await rtRepo.findOne({ where: { tokenHash } });
    if (storedToken && !storedToken.isRevoked) {
      storedToken.isRevoked = true;
      await rtRepo.save(storedToken);
    }
  }

  static async getProfile(userId: string): Promise<UserResponse> {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError(404, 'User not found', 'Not Found');
    }

    return toUserResponse(user);
  }
}
