import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  async execute(id: string, data: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    if (data.email) {
      const userByEmail = await usersRepository.findByEmail(data.email);

      if (userByEmail && userByEmail.id !== userById.id)
        throw new AppError('Email address already used');
    }

    const newUser = {
      ...userById,
      ...data,
    };

    const userToUpdate = new User();
    userToUpdate.id = id;
    userToUpdate.name = newUser.name;
    userToUpdate.email = newUser.email;

    if (data.password) {
      const hash = new Hash();
      userToUpdate.password = await hash.generate(data.password);
    }

    const userUpdated = await usersRepository.update(id, userToUpdate);

    return userUpdated;
  }
}

export default UpdateUserService;
