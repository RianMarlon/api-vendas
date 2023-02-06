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
  driver: process.env.MAIL_DRIVER || 'mailtrap',
  defaults: {
    from: {
      email: 'rianmarlon95@gmail.com',
    },
  },
} as IMailConfig;
