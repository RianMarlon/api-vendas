import { isAfter, isBefore, addHours } from 'date-fns';

import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/users-tokens-repository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute(data: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UsersTokensRepository();

    const userTokenByToken = await usersTokensRepository.findByToken(
      data.token,
    );

    if (!userTokenByToken) {
      throw new AppError('User token does not exists.');
    }

    const userById = await usersRepository.findById(userTokenByToken.userId);

    if (!userById) throw new AppError('User does not exists');

    const tokenCreatedAt = userTokenByToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (
      isAfter(Date.now(), compareDate) ||
      isBefore(Date.now(), tokenCreatedAt)
    )
      throw new AppError('Token expired');

    const hash = new Hash();
    const newPassword = await hash.generate(data.password);

    await usersRepository.update(userById.id, {
      password: newPassword,
    });
  }
}

export default ResetPasswordService;
