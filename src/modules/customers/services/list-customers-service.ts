import { IPagination } from '@shared/interfaces/pagination.interface';

import Customer from '../infra/typeorm/entities/customer';
import CustomersRepository from '../infra/typeorm/repositories/customers-repository';

class ListCustomersService {
  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<Customer>> {
    const customersRepository = new CustomersRepository();

    const customers = await customersRepository.findAll({ page, limit });

    return customers;
  }
}

export default ListCustomersService;
