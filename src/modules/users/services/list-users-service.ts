import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

class ListUsersService {
  async execute(): Promise<User[]> {
    const usersRepository = new UsersRepository();

    const users = await usersRepository.findAll();

    return users;
  }
}

export default ListUsersService;
