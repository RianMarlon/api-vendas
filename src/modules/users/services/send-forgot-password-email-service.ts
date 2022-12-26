import path from 'path';

import AppError from '@shared/errors/app-error';

import Mailtrap from '@config/mail/mailtrap';
import SESMail from '@config/mail/ses';
import mailConfig from '@config/mail/mail';

import UsersRepository from '../typeorm/repositories/users-repository';
import UsersTokensRepository from '../typeorm/repositories/users-tokens-repository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  async execute(data: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UsersTokensRepository();

    const userByEmail = await usersRepository.findByEmail(data.email);

    if (!userByEmail) throw new AppError('User does not exists');

    const { token } = await usersTokensRepository.generate(userByEmail.id);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'templates',
      'forgot-password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      SESMail.sendEmail({
        to: {
          name: userByEmail.name,
          email: userByEmail.email,
        },
        subject: 'Redefinição de senha',
        html: {
          file: templateFile,
          variables: {
            name: userByEmail.name,
            link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          },
        },
      });
      return;
    }

    Mailtrap.sendEmail({
      to: {
        name: userByEmail.name,
        email: userByEmail.email,
      },
      subject: 'Redefinição de senha',
      html: {
        file: templateFile,
        variables: {
          name: userByEmail.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
