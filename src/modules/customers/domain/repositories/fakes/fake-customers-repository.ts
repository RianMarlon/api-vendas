import { UUID } from '@shared/utils/uuid';
import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

import { ICustomersRepository } from '@modules/customers/domain/repositories/customers-repository.interface';
import { ICustomer } from '../../models/customer.interface';
import { ICreateCustomer } from '../../models/create-customer.interface';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: ICustomer[] = [];

  async findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<ICustomer>> {
    const limit = Number(paginationOptions.limit) || 50;
    const page = Number(paginationOptions.page) || 1;

    const items = this.customers.slice((page - 1) * limit, limit * page);
    const totalPages = Math.ceil(this.customers.length / Number(limit));
    const quantityItemsReturned = items.length;

    return {
      items,
      metadata: {
        totalItems: this.customers.length,
        totalPages,
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        quantityItemsReturned: quantityItemsReturned,
      },
    } as IPagination<ICustomer>;
  }

  async findByName(name: string): Promise<ICustomer | null> {
    return this.customers.find(customer => customer.name === name) || null;
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    return this.customers.find(customer => customer.email === email) || null;
  }

  async findById(id: string): Promise<ICustomer | null> {
    return this.customers.find(customer => customer.id === id) || null;
  }

  async create(customerToCreate: ICreateCustomer): Promise<ICustomer> {
    const uuid = new UUID();
    const customer = {
      id: uuid.generate(),
      ...customerToCreate,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ICustomer;

    this.customers.push(customer);

    return customer;
  }

  async update(
    id: string,
    customerToUpdate: Partial<ICreateCustomer>,
  ): Promise<ICustomer> {
    const indexOfCustomer = this.customers.findIndex(
      customer => customer.id === id,
    );
    const newCustomer = {
      ...this.customers[indexOfCustomer],
      ...customerToUpdate,
      updatedAt: new Date(),
    } as ICustomer;

    this.customers[indexOfCustomer] = newCustomer;

    return newCustomer;
  }

  async delete(id: string): Promise<void> {
    const indexOfCustomer = this.customers.findIndex(
      customer => customer.id === id,
    );
    this.customers.splice(indexOfCustomer, 1);
  }
}

export default FakeCustomersRepository;
