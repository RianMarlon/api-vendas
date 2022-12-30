import Redis, { Redis as IRedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

export default class RedisClient {
  private client: IRedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  }

  public async save(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async saveWithExpiration(
    key: string,
    value: unknown,
    expiresAtInMilliseconds: number,
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
    await this.client.expireat(key, Math.floor(expiresAtInMilliseconds / 1000));
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
