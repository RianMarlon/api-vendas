import { IPagination } from '@shared/infra/typeorm/pagination/interfaces/pagination.interface';

import User from '../infra/typeorm/entities/user';
import UsersRepository from '../infra/typeorm/repositories/users-repository';

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
