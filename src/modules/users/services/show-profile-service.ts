import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IUser } from '../domain/models/user.interface';
import { IUsersRepository } from '../domain/repositories/users-repository.interface';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUser | null> {
    const userById = await this.usersRepository.findById(id);

    if (!userById) throw new AppError('User not found', 404);

    return userById;
  }
}

export default ShowProfileService;
