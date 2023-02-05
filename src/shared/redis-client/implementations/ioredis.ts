import Redis, { Redis as IClienRedis } from 'ioredis';

import cacheConfig from '@config/cache';

import { IRedisClient } from '../models/redis-client.interface';

export default class IORedis implements IRedisClient {
  private static client: IClienRedis;

  constructor() {
    if (!IORedis.client) {
      IORedis.client = new Redis(cacheConfig.config.redis);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await IORedis.client.get(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  }

  async save(
    key: string,
    value: unknown,
    expiresAtInSeconds?: number,
  ): Promise<void> {
    if (expiresAtInSeconds) {
      await IORedis.client.setex(
        key,
        expiresAtInSeconds,
        JSON.stringify(value),
      );
      return;
    }

    await IORedis.client.set(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    await IORedis.client.del(key);
  }
}
