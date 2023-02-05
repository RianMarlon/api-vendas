export interface IRedisClient {
  get<T>(key: string): Promise<T | null>;
  save(key: string, value: unknown, expiresAtInSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}
