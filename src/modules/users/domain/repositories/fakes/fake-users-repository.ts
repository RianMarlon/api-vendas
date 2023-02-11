import { UUID } from '@shared/utils/uuid';
import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

import { IUser } from '../../models/user.interface';
import { IUsersRepository } from '../users-repository.interface';
import { ICreateUser } from '../../models/create-user.interface';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<IUser>> {
    const limit = Number(paginationOptions.limit) || 50;
    const page = Number(paginationOptions.page) || 1;

    const items = this.users.slice((page - 1) * limit, limit * page);
    const totalPages = Math.ceil(this.users.length / Number(limit));
    const quantityItemsReturned = items.length;

    return {
      items,
      metadata: {
        totalItems: this.users.length,
        totalPages,
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        quantityItemsReturned: quantityItemsReturned,
      },
    } as IPagination<IUser>;
  }

  async findByName(name: string): Promise<IUser | undefined> {
    return this.users.find(user => user.name === name);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(userToCreate: ICreateUser): Promise<IUser> {
    const uuid = new UUID();
    const user = {
      id: uuid.generate(),
      ...userToCreate,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IUser;

    this.users.push(user);

    return user;
  }

  async update(id: string, userToUpdate: Partial<ICreateUser>): Promise<IUser> {
    const indexOfUser = this.users.findIndex(user => user.id === id);
    const newUser = {
      ...this.users[indexOfUser],
      ...userToUpdate,
      updatedAt: new Date(),
    } as IUser;

    this.users[indexOfUser] = newUser;

    return newUser;
  }

  async delete(id: string): Promise<void> {
    const indexOfUser = this.users.findIndex(user => user.id === id);
    this.users.splice(indexOfUser, 1);
  }
}

export default FakeUsersRepository;
