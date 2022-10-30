import path from 'path';

import Mail from '@config/mail/mail';
import AppError from '@shared/errors/app-error';

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
    Mail.sendEmail({
      from: {
        name: 'Equipe API Vendas',
        email: 'naoresponda@apivendas.com.br',
      },
      to: {
        name: userByEmail.name,
        email: userByEmail.email,
      },
      subject: 'Redefinição de senha',
      html: {
        file: templateFile,
        variables: {
          name: userByEmail.name,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
