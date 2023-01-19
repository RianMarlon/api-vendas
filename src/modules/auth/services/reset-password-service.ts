import { inject, injectable } from 'tsyringe';
import { isAfter, isBefore, addHours } from 'date-fns';

import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import { IUsersRepository } from '@modules/users/domain/repositories/users-repository.interface';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/users-tokens-repository.interface';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const userTokenByToken = await this.usersTokensRepository.findByToken(
      data.token,
    );

    if (!userTokenByToken) {
      throw new AppError('User token does not exists.');
    }

    const userById = await this.usersRepository.findById(
      userTokenByToken.userId,
    );

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

    await this.usersRepository.update(userById.id, {
      password: newPassword,
    });
  }
}

export default ResetPasswordService;
