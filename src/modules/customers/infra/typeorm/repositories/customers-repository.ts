import { getRepository } from 'typeorm';

import { IPaginationOptions } from '@shared/interfaces/pagination-options.interface';
import { IPagination } from '@shared/interfaces/pagination.interface';
import pagination from '@shared/utils/pagination';

import Customer from '../entities/customer';

import { ICustomersRepository } from '@modules/customers/domain/repositories/customers-repository.interface';

class CustomersRepository implements ICustomersRepository {
  private readonly repository = getRepository(Customer);

  async findAll(
    paginationOptions: IPaginationOptions<Customer>,
  ): Promise<IPagination<Customer>> {
    return await pagination<Customer>(this.repository, paginationOptions);
  }

  async findByName(name: string): Promise<Customer | undefined> {
    return await this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async findById(id: string): Promise<Customer | undefined> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async create(customerToCreate: Customer): Promise<Customer> {
    const customerCreated = this.repository.create(customerToCreate);
    await this.repository.save(customerCreated);

    return customerCreated;
  }

  async update(
    id: string,
    customerToUpdate: Partial<Customer>,
  ): Promise<Customer> {
    const customerUpdated = this.repository.create({
      ...customerToUpdate,
      id,
    });

    await this.repository.save(customerUpdated);

    return customerUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default CustomersRepository;
