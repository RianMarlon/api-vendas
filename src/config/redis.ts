import { RedisOptions } from 'ioredis';

import config from './index';

export default {
  redis: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASS || undefined,
  },
} as RedisOptions;
