import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';
import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';
import { pagination } from '@shared/infra/typeorm/pagination';

import User from '../entities/user';

import { IUsersRepository } from '@modules/users/domain/repositories/users-repository.interface';

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<User>> {
    return await pagination<User>(this.repository, paginationOptions);
  }

  async findByName(name: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async create(userToCreate: User): Promise<User> {
    const userCreated = this.repository.create(userToCreate);
    await this.repository.save(userCreated);

    return userCreated;
  }

  async update(id: string, userToUpdate: Partial<User>): Promise<User> {
    const userUpdated = this.repository.create({
      ...userToUpdate,
      id,
    });

    await this.repository.save(userUpdated);

    return userUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersRepository;
