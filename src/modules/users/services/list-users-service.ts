import User from '../typeorm/entities/user';

import { IPagination } from '@shared/interfaces/pagination.interface';

import UsersRepository from '../typeorm/repositories/users-repository';

class ListUsersService {
  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<User>> {
    const usersRepository = new UsersRepository();

    const users = await usersRepository.findAll({
      page,
      limit,
    });

    return users;
  }
}

export default ListUsersService;
