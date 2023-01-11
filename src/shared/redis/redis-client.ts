import Redis, { Redis as IRedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

export default class RedisClient {
  private client: IRedisClient;
  private static connected = false;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
    if (!RedisClient.connected) {
      RedisClient.connected = true;
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  }

  public async save(
    key: string,
    value: unknown,
    expiresAtInMilliseconds?: number,
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value));

    if (expiresAtInMilliseconds)
      await this.client.expireat(
        key,
        Math.floor(expiresAtInMilliseconds / 1000),
      );
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
