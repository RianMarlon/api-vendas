import { IRedisClient } from '../models/redis-client.interface';

export default class FakeRedisClient implements IRedisClient {
  private keys: Map<string, string> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const value = this.keys.get(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  }

  async save(key: string, value: unknown): Promise<void> {
    this.keys.set(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    this.keys.delete(key);
  }
}
