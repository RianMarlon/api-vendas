import 'dotenv/config';

export default {
  jwt: {
    secret: process.env.AUTH_SECRET as string,
    expiresIn: '1d',
  },
};
