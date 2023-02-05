import { injectable, inject } from 'tsyringe';

import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

@injectable()
class DeleteRefreshTokenService {
  constructor(
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(hash: string): Promise<void> {
    await this.redisClient.delete(`token:${hash}`);
  }
}

export default DeleteRefreshTokenService;
