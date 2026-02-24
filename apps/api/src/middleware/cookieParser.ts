import type { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';

export const cookieParserMiddleware: RequestHandler = cookieParser();
