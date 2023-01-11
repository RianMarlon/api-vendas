import AppError from '@shared/errors/app-error';

import Customer from '../infra/typeorm/entities/customer';
import CustomersRepository from '../infra/typeorm/repositories/customers-repository';

class ShowCustomerService {
  async execute(id: string): Promise<Customer | undefined> {
    const customersRepository = new CustomersRepository();
    const customerById = await customersRepository.findById(id);

    if (!customerById) throw new AppError('Customer not found');

    return customerById;
  }
}

export default ShowCustomerService;
