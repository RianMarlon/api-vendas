import { addDays } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { createHmac } from 'crypto';

import AppError from '@shared/errors/app-error';
import RedisClient from '@shared/redis/redis-client';
import auth from '@config/auth';

import ShowProfileService from '@modules/users/services/show-profile-service';

class GenerateRefreshTokenService {
  async execute(userId: string): Promise<string> {
    const redisClient = new RedisClient();
    const showProfileService = new ShowProfileService();

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
        expiresIn: '1h',
      },
    );

    const refreshTokenHash = createHmac('sha512', auth.refreshTokenSecret)
      .update(refreshToken)
      .digest('hex');

    const refreshTokenExpiresIn = addDays(Date.now(), 7).getTime();
    await redisClient.save(
      `token:${refreshTokenHash}`,
      {
        userId: userById.id,
      },
      refreshTokenExpiresIn,
    );

    return refreshToken;
  }
}

export default GenerateRefreshTokenService;
