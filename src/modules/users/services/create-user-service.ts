import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import User from '../infra/typeorm/entities/user';

import UsersRepository from '../infra/typeorm/repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute(data: IRequest): Promise<User> {
    data.email = data.email?.toLowerCase();

    const usersRepository = new UsersRepository();
    const hash = new Hash();

    const userByEmail = await usersRepository.findByEmail(data.email);

    if (userByEmail) throw new AppError('Email address already used');

    const userCreated = new User();
    userCreated.name = data.name;
    userCreated.email = data.email.toLowerCase();
    userCreated.password = await hash.generate(data.password);

    await usersRepository.create(userCreated);

    return userCreated;
  }
}

export default CreateUserService;
