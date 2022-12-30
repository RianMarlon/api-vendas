import RedisClient from '@shared/redis/redis-client';

import { IRefreshToken } from '../interfaces/refresh-token.intergace';

class FindRefreshTokenByHashService {
  async execute(hash: string): Promise<IRefreshToken | null> {
    const redisClient = new RedisClient();
    const refreshTokenByHash = await redisClient.get<IRefreshToken>(
      `token:${hash}`,
    );
    return refreshTokenByHash;
  }
}

export default FindRefreshTokenByHashService;
