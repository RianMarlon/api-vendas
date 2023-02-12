import 'dotenv/config';

export default {
  APP_API_URL: process.env.APP_API_URL,
  APP_WEB_URL: process.env.APP_WEB_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  ACCESS_TOKEN_DURATION_MINUTES: Number(
    process.env.ACCESS_TOKEN_DURATION_MINUTES,
  ),
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  REFRESH_TOKEN_DURATION_MINUTES: Number(
    process.env.REFRESH_TOKEN_DURATION_MINUTES,
  ),
  TYPEORM_HOST: process.env.TYPEORM_HOST,
  TYPEORM_PORT: process.env.TYPEORM_PORT,
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASS: process.env.REDIS_PASS,
  MAIL_DRIVER: process.env.MAIL_DRIVER || 'mailtrap',
  STORAGE_DRIVER: process.env.STORAGE_DRIVER || 'disk',
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};
