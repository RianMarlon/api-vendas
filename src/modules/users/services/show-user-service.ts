import AppError from '@shared/errors/app-error';

import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

class ShowUserService {
  async execute(id: string): Promise<User | undefined> {
    const usersRepository = new UsersRepository();
    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found', 404);

    return userById;
  }
}

export default ShowUserService;
