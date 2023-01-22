import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

import { ICustomer } from '../models/customer.interface';
import { ICreateCustomer } from '../models/create-customer.interface';

export interface ICustomersRepository {
  findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<ICustomer>>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  create(customerToCreate: ICreateCustomer): Promise<ICustomer>;
  update(
    id: string,
    customerToUpdate: Partial<ICreateCustomer>,
  ): Promise<ICustomer>;
  delete(id: string): Promise<void>;
}
