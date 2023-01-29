import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import { IHashProvider } from '@shared/providers/hash/models/hash-provider.interface';

import { IUsersRepository } from '../domain/repositories/users-repository.interface';
import { IUser } from '../domain/models/user.interface';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: IRequest): Promise<IUser> {
    data.email = data.email.toLowerCase();
    const userByEmail = await this.usersRepository.findByEmail(data.email);

    if (userByEmail) throw new AppError('Email address already used');

    const userCreated = await this.usersRepository.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: await this.hashProvider.generate(data.password),
    });

    return userCreated;
  }
}

export default CreateUserService;
