import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/app-error';
import DiskStorageProvider from '@shared/providers/storage-provider/disk-storage-provider';
import S3StorageProvider from '@shared/providers/storage-provider/s3-storage';

import { IUser } from '../domain/models/user.interface';
import { IUsersRepository } from '../domain/repositories/users-repository.interface';

interface IRequest {
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string, data: IRequest): Promise<IUser> {
    const diskStorageProvider = new DiskStorageProvider();
    const s3StorageProvider = new S3StorageProvider();

    const userById = await this.usersRepository.findById(id);

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
    await this.usersRepository.update(id, userById);

    return userById;
  }
}

export default UpdateUserAvatarService;
