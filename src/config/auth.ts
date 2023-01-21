import 'dotenv/config';

export default {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  accessTokenDurationMinutes: Number(process.env.ACCESS_TOKEN_DURATION_MINUTES),
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  refreshTokenDurationMinutes: Number(
    process.env.REFRESH_TOKEN_DURATION_MINUTES,
  ),
};
