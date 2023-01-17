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
    expiresAtInMilliseconds?: number,
  ): Promise<void> {
    await RedisClient.client.set(key, JSON.stringify(value));

    if (expiresAtInMilliseconds)
      await RedisClient.client.expireat(
        key,
        Math.floor(expiresAtInMilliseconds / 1000),
      );
  }

  public async delete(key: string): Promise<void> {
    await RedisClient.client.del(key);
  }
}
