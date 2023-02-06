import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/app-error';

import { IUsersRepository } from '@modules/users/domain/repositories/users-repository.interface';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/users-tokens-repository.interface';
import { IMailProvider } from '@shared/providers/mail/models/mail-provider.interface';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const userByEmail = await this.usersRepository.findByEmail(data.email);

    if (!userByEmail) throw new AppError('User does not exists', 404);

    const { token } = await this.usersTokensRepository.generate(userByEmail.id);

    const templateFile = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'templates',
      'forgot-password.hbs',
    );

    await this.mailProvider.sendEmail({
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
