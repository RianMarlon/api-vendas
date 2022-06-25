import AppError from '@shared/errors/app-error';

import UsersRepository from '../typeorm/repositories/users-repository';

class DeleteUserService {
  async execute(id: string): Promise<void> {
    const usersRepository = new UsersRepository();
    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    await usersRepository.delete(id);
  }
}

export default DeleteUserService;
