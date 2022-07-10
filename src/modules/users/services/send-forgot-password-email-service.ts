import Mail from '@config/mail';
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

    Mail.sendEmail({
      from: 'naoresponda@apivendas.com.br',
      to: userByEmail.email,
      subject: 'Redefinição de senha',
      html: `Solicitação de redefinicação de senha recebida: ${token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
