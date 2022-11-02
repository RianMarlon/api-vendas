import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';
import Customer from '../typeorm/entities/customer';
import CustomersRepository from '../typeorm/repositories/customers-repository';

interface IRequest {
  name: string;
  email: string;
}

class UpdateCustomerService {
  async execute(id: string, data: IRequest): Promise<Customer> {
    const customersRepository = new CustomersRepository();
    const customerById = await customersRepository.findById(id);

    if (!customerById) throw new AppError('Customer not found.');

    const newCustomer = {
      name: data.name || customerById.name,
      email: data.email?.toLowerCase() || customerById.email,
    };

    if (data.email) {
      const customerByEmail = await customersRepository.findByEmail(data.email);
      if (customerByEmail && customerById.id !== customerByEmail.id)
        throw new AppError('There is already one customer with this email.');
    }

    const customerUpdated = await customersRepository.update(id, newCustomer);

    return customerUpdated;
  }
}

export default UpdateCustomerService;
