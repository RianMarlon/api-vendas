import { getRepository } from 'typeorm';

import Customer from '../entities/customer';

class CustomersRepository {
  private readonly repository = getRepository(Customer);

  async findAll(): Promise<Customer[]> {
    return await this.repository.find();
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
