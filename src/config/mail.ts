import config from './index';

interface IMailConfig {
  driver: 'mailtrap' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: config.MAIL_DRIVER || 'mailtrap',
  defaults: {
    from: {
      email: 'rianmarlon95@gmail.com',
    },
  },
} as IMailConfig;
