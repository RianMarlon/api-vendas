import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { ICustomersRepository } from '../domain/repositories/customers-repository.interface';
import { ICustomer } from '../domain/models/customer.interface';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: IRequest): Promise<ICustomer> {
    data.email = data.email.toLowerCase();
    const customerByEmail = await this.customersRepository.findByEmail(
      data.email,
    );

    if (customerByEmail) throw new AppError('Email address already used');

    const customerCreated = await this.customersRepository.create({
      name: data.name,
      email: data.email.toLowerCase(),
    });

    return customerCreated;
  }
}

export default CreateCustomerService;
