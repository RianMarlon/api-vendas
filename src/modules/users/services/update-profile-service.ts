import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IUsersRepository } from '../domain/repositories/users-repository.interface';
import { IUser } from '../domain/models/user.interface';
import { IHashProvider } from '@shared/providers/hash/models/hash-provider.interface';

interface IRequest {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(id: string, data: IRequest): Promise<IUser> {
    const userById = await this.usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    const newUser = {
      name: data.name || userById.name,
      email: data.email?.toLowerCase() || userById.email,
      password: userById.password,
    };

    if (data.email) {
      const userByEmail = await this.usersRepository.findByEmail(data.email);
      if (userByEmail && userById.id !== userByEmail.id)
        throw new AppError('There is already one user with this email');
    }

    if (data.password && data.oldPassword) {
      const oldPasswordMatch = await this.hashProvider.compare(
        data.oldPassword,
        userById.password,
      );

      if (!oldPasswordMatch) throw new AppError('Old password does not match');

      if (data.password) {
        newUser.password = await this.hashProvider.generate(data.password);
      }
    }

    const userUpdated = await this.usersRepository.update(id, newUser);

    return userUpdated;
  }
}

export default UpdateProfileService;
