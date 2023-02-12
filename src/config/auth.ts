import 'dotenv/config';

import config from './index';

export default {
  accessTokenSecret: config.ACCESS_TOKEN_SECRET as string,
  accessTokenDurationMinutes: Number(config.ACCESS_TOKEN_DURATION_MINUTES),
  refreshTokenSecret: config.REFRESH_TOKEN_SECRET as string,
  refreshTokenDurationMinutes: Number(config.REFRESH_TOKEN_DURATION_MINUTES),
};
