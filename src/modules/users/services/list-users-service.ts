import { inject, injectable } from 'tsyringe';

import { IPagination } from '@shared/domain/models/pagination.interface';
import { IUser } from '../domain/models/user.interface';
import { IUsersRepository } from '../domain/repositories/users-repository.interface';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<IUser>> {
    return await this.usersRepository.findAll({
      page,
      limit,
    });
  }
}

export default ListUsersService;
