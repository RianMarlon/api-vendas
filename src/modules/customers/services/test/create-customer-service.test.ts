import 'reflect-metadata';

import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/fake-customers-repository';
import CreateCustomerService from '../create-customer-service';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should create a new customer', async () => {
    const data = {
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    };
    const customer = await createCustomerService.execute(data);

    expect(customer).toMatchObject({
      ...data,
    });
    expect(customer).toHaveProperty('id');
    expect(customer).toHaveProperty('createdAt');
    expect(customer).toHaveProperty('updatedAt');
  });

  it('should throw an error when already exists a customer with same email', async () => {
    const data = {
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    };
    await createCustomerService.execute(data);
    await expect(createCustomerService.execute(data)).rejects.toEqual({
      message: 'Email address already used',
      statusCode: 400,
    });
  });
});
