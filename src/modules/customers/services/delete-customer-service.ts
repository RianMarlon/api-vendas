import AppError from '@shared/errors/app-error';

import CustomersRepository from '../infra/typeorm/repositories/customers-repository';

class DeleteCustomerService {
  async execute(id: string): Promise<void> {
    const customersRepository = new CustomersRepository();
    const customerById = await customersRepository.findById(id);

    if (!customerById) throw new AppError('Customer not found');

    await customersRepository.delete(id);
  }
}

export default DeleteCustomerService;
