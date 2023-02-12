import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

import { ICreateUser } from '../models/create-user.interface';
import { IUser } from '../models/user.interface';

export interface IUsersRepository {
  findAll(paginationOptions: IPaginationOptions): Promise<IPagination<IUser>>;
  findByName(name: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  create(userToCreate: ICreateUser): Promise<IUser>;
  update(id: string, userToUpdate: Partial<ICreateUser>): Promise<IUser>;
  delete(id: string): Promise<void>;
}
