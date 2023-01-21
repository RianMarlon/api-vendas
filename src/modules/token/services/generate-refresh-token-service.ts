import { sign } from 'jsonwebtoken';
import { createHmac } from 'crypto';
import { container } from 'tsyringe';

import auth from '@config/auth';
import AppError from '@shared/errors/app-error';
import RedisClient from '@shared/redis/redis-client';

import ShowProfileService from '@modules/users/services/show-profile-service';

class GenerateRefreshTokenService {
  async execute(userId: string): Promise<string> {
    const redisClient = new RedisClient();
    const showProfileService = container.resolve(ShowProfileService);

    const userById = await showProfileService.execute(userId);

    if (!userById) throw new AppError('User not exists');

    const refreshToken = sign(
      {
        sub: userId,
      },
      auth.refreshTokenSecret,
      {
        audience: 'urn:jwt:type:refresh',
        issuer: 'urn:system:token-issuer:type:refresh',
        expiresIn: `${auth.refreshTokenDurationMinutes}m`,
      },
    );

    const refreshTokenHash = createHmac('sha512', auth.refreshTokenSecret)
      .update(refreshToken)
      .digest('hex');

    await redisClient.save(
      `token:${refreshTokenHash}`,
      {
        userId: userById.id,
      },
      auth.refreshTokenDurationMinutes * 60,
    );

    return refreshToken;
  }
}

export default GenerateRefreshTokenService;
