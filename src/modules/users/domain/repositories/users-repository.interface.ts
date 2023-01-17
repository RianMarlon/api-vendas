import { IPaginationOptions } from '@shared/infra/typeorm/pagination/interfaces/pagination-options.interface';
import { IPagination } from '@shared/infra/typeorm/pagination/interfaces/pagination.interface';
import { IUser } from '../models/user.interface';

export interface IUsersRepository {
  findAll(
    paginationOptions: IPaginationOptions<IUser>,
  ): Promise<IPagination<IUser>>;
  findByName(name: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  create(userToCreate: IUser): Promise<IUser>;
  update(id: string, userToUpdate: Partial<IUser>): Promise<IUser>;
  delete(id: string): Promise<void>;
}