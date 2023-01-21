import Redis, { Redis as IRedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

export default class RedisClient {
  private static client: IRedisClient;

  constructor() {
    if (!RedisClient.client) {
      RedisClient.client = new Redis(cacheConfig.config.redis);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await RedisClient.client.get(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  }

  public async save(
    key: string,
    value: unknown,
    expiresAtInSeconds?: number,
  ): Promise<void> {
    if (expiresAtInSeconds) {
      await RedisClient.client.setex(
        key,
        expiresAtInSeconds,
        JSON.stringify(value),
      );
      return;
    }

    await RedisClient.client.set(key, JSON.stringify(value));
  }

  public async delete(key: string): Promise<void> {
    await RedisClient.client.del(key);
  }
}
