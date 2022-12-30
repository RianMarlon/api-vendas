import { addDays } from 'date-fns';
import { createHmac, randomUUID } from 'crypto';

import AppError from '@shared/errors/app-error';

import auth from '@config/auth';

import ShowProfileService from '@modules/users/services/show-profile-service';
import RedisClient from '@shared/redis/redis-client';

class GenerateRefreshTokenService {
  async execute(userId: string): Promise<string> {
    const redisClient = new RedisClient();
    const showProfileService = new ShowProfileService();

    const userById = await showProfileService.execute(userId);

    if (!userById) throw new AppError('User not exists');

    const tokenHash = createHmac('sha512', auth.refreshTokenSecret)
      .update(randomUUID())
      .digest('hex');

    const refreshTokenExpiresIn = addDays(Date.now(), 7).getTime();
    await redisClient.saveWithExpiration(
      `token:${tokenHash}`,
      {
        userId: userById.id,
      },
      refreshTokenExpiresIn,
    );

    return tokenHash;
  }
}

export default GenerateRefreshTokenService;
