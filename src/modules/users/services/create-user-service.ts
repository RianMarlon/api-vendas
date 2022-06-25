import AppError from '@shared/errors/app-error';

import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute(data: IRequest): Promise<User> {
    data.email = data.email?.toLowerCase();

    const usersRepository = new UsersRepository();
    const userByEmail = await usersRepository.findByEmail(data.email);

    if (userByEmail) throw new AppError('Email address already used');

    const userCreated = new User();
    userCreated.name = data.name;
    userCreated.email = data.email.toLowerCase();
    userCreated.password = data.password;

    await usersRepository.create(userCreated);

    return userCreated;
  }
}
