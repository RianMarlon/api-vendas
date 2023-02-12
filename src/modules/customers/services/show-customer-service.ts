import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { ICustomersRepository } from '../domain/repositories/customers-repository.interface';
import { ICustomer } from '../domain/models/customer.interface';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<ICustomer | null> {
    const customerById = await this.customersRepository.findById(id);

    if (!customerById) throw new AppError('Customer not found', 404);

    return customerById;
  }
}

export default ShowCustomerService;
