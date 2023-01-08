import uploadConfig from '@config/upload';

import AppError from '@shared/errors/app-error';
import DiskStorageProvider from '@shared/providers/storage-provider/disk-storage-provider';
import S3StorageProvider from '@shared/providers/storage-provider/s3-storage';

import User from '../typeorm/entities/user';

import UsersRepository from '../typeorm/repositories/users-repository';

interface IRequest {
  avatarFilename: string;
}

class UpdateUserAvatarService {
  async execute(id: string, data: IRequest): Promise<User> {
    const diskStorageProvider = new DiskStorageProvider();
    const s3StorageProvider = new S3StorageProvider();
    const usersRepository = new UsersRepository();

    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    if (userById.avatar) {
      if (uploadConfig.driver === 's3') {
        await s3StorageProvider.deleteFile(userById.avatar);
      } else {
        await diskStorageProvider.deleteFile(userById.avatar);
      }
    }

    const filename =
      uploadConfig.driver === 's3'
        ? await s3StorageProvider.saveFile(data.avatarFilename)
        : await diskStorageProvider.saveFile(data.avatarFilename);

    userById.avatar = filename;
    await usersRepository.update(id, userById);

    return userById;
  }
}

export default UpdateUserAvatarService;
