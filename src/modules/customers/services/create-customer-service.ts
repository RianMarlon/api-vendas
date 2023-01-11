import AppError from '@shared/errors/app-error';

import Customer from '../infra/typeorm/entities/customer';

import CustomersRepository from '../infra/typeorm/repositories/customers-repository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute(data: IRequest): Promise<Customer> {
    data.email = data.email?.toLowerCase();

    const customersRepository = new CustomersRepository();
    const customerByEmail = await customersRepository.findByEmail(data.email);

    if (customerByEmail) throw new AppError('Email address already used');

    const customerCreated = new Customer();
    customerCreated.name = data.name;
    customerCreated.email = data.email.toLowerCase();

    await customersRepository.create(customerCreated);

    return customerCreated;
  }
}

export default CreateCustomerService;
