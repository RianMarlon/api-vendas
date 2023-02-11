import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { ICustomersRepository } from '../domain/repositories/customers-repository.interface';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const customerById = await this.customersRepository.findById(id);

    if (!customerById) throw new AppError('Customer not found', 404);

    await this.customersRepository.delete(id);
  }
}

export default DeleteCustomerService;
