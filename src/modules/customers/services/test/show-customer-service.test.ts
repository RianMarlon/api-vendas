import 'reflect-metadata';

import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/fake-customers-repository';
import ShowCustomerService from '../show-customer-service';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomerService: ShowCustomerService;

describe('ShowCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomerService = new ShowCustomerService(fakeCustomersRepository);
  });

  it('should be able to return a customer with id informed', async () => {
    const customerCreated = await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    const customerFound = await showCustomerService.execute(customerCreated.id);

    expect(customerFound).toMatchObject(customerCreated);
  });

  it('should throw an error when not exists a customer with the id', async () => {
    await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    await expect(showCustomerService.execute('teste')).rejects.toEqual({
      message: 'Customer not found',
      statusCode: 404,
    });
  });
});
