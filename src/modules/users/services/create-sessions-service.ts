import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  async execute(data: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByEmail(data.email);

    if (!user)
      throw new AppError('The email address or password is incorrect', 401);

    const hash = new Hash();
    const matchPassword = await hash.compare(data.password, user.password);

    if (!matchPassword)
      throw new AppError('The email address or password is incorrect', 401);

    return user;
  }
}

export default CreateSessionsService;
