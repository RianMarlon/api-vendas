import path from 'path';
import fs from 'fs/promises';

import AppError from '@shared/errors/app-error';

import uploadConfig from '@config/upload';

import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

interface IRequest {
  avatarFilename: string;
}

class UpdateUserAvatarService {
  async execute(id: string, data: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    if (userById.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        userById.avatar,
      );
      const userAvatarFileExists = await fs.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.unlink(userAvatarFilePath);
      }
    }

    userById.avatar = data.avatarFilename;
    await usersRepository.update(id, userById);

    return userById;
  }
}

export default UpdateUserAvatarService;
