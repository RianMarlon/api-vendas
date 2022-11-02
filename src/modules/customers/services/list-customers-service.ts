import Customer from '../typeorm/entities/customer';

import CustomersRepository from '../typeorm/repositories/customers-repository';

class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const customersRepository = new CustomersRepository();

    const customers = await customersRepository.findAll();

    return customers;
  }
}

export default ListCustomersService;
