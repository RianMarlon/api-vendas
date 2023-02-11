import { injectable, inject } from 'tsyringe';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import { IRefreshToken } from '../interfaces/refresh-token.intergace';

@injectable()
class FindRefreshTokenByHashService {
  constructor(
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(hash: string): Promise<IRefreshToken | null> {
    const refreshTokenByHash = await this.redisClient.get<IRefreshToken>(
      `token:${hash}`,
    );
    return refreshTokenByHash;
  }
}

export default FindRefreshTokenByHashService;
