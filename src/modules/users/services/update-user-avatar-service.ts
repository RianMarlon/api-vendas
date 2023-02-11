import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IUser } from '../domain/models/user.interface';
import { IUsersRepository } from '../domain/repositories/users-repository.interface';
import { IStorageProvider } from '@shared/providers/storage/models/storage-provider.interface';

interface IRequest {
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(id: string, data: IRequest): Promise<IUser> {
    const userById = await this.usersRepository.findById(id);

    if (!userById) throw new AppError('User not found', 404);

    if (userById.avatar) {
      await this.storageProvider.deleteFile(userById.avatar);
    }

    const filename = await this.storageProvider.saveFile(data.avatarFilename);

    userById.avatar = filename;
    await this.usersRepository.update(id, userById);

    return userById;
  }
}

export default UpdateUserAvatarService;
