import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { ICustomersRepository } from '../domain/repositories/customers-repository.interface';
import { ICustomer } from '../domain/models/customer.interface';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string, data: IRequest): Promise<ICustomer> {
    const customerById = await this.customersRepository.findById(id);

    if (!customerById) throw new AppError('Customer not found.');

    const newCustomer = {
      name: data.name || customerById.name,
      email: data.email?.toLowerCase() || customerById.email,
    };

    if (data.email) {
      const customerByEmail = await this.customersRepository.findByEmail(
        data.email,
      );
      if (customerByEmail && customerById.id !== customerByEmail.id)
        throw new AppError('There is already one customer with this email.');
    }

    const customerUpdated = await this.customersRepository.update(
      id,
      newCustomer,
    );

    return customerUpdated;
  }
}

export default UpdateCustomerService;
