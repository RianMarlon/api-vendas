import Customer from '../typeorm/entities/customer';

import { IPagination } from '@shared/interfaces/pagination.interface';

import CustomersRepository from '../typeorm/repositories/customers-repository';

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
