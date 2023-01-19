import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IUsersRepository } from '../domain/repositories/users-repository.interface';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const userById = await this.usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
