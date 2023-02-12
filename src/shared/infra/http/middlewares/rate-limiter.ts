import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import config from '@config/index';

import AppError from '@shared/errors/app-error';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis({
      host: config.REDIS_HOST,
      port: Number(config.REDIS_PORT),
      password: config.REDIS_PASS || undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'api-vendas:ratelimit',
      points: 3,
      duration: 1,
    });

    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
