import RedisClient from '@shared/redis/redis-client';

class DeleteRefreshTokenService {
  async execute(hash: string): Promise<void> {
    const redisClient = new RedisClient();
    await redisClient.delete(`token:${hash}`);
  }
}

export default DeleteRefreshTokenService;
