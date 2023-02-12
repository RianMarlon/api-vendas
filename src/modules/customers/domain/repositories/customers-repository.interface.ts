import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

import { ICustomer } from '../models/customer.interface';
import { ICreateCustomer } from '../models/create-customer.interface';

export interface ICustomersRepository {
  findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<ICustomer>>;
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  create(customerToCreate: ICreateCustomer): Promise<ICustomer>;
  update(
    id: string,
    customerToUpdate: Partial<ICreateCustomer>,
  ): Promise<ICustomer>;
  delete(id: string): Promise<void>;
}
