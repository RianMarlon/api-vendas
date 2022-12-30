import { RedisOptions } from 'ioredis';

import redis from './redis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis,
  },
  driver: 'redis',
} as ICacheConfig;
