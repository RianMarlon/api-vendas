import 'reflect-metadata';

import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/fake-customers-repository';
import UpdateCustomerService from '../update-customer-service';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomerService: UpdateCustomerService;

describe('UpdateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);
  });

  it('should update only field of customer with new data', async () => {
    const customerCreated = await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    const customerUpdated = await updateCustomerService.execute(
      customerCreated.id,
      {
        name: 'Rian Marlon 2',
      },
    );

    expect(customerUpdated).toMatchObject({
      id: customerCreated.id,
      name: 'Rian Marlon 2',
      email: 'rianmarlon@gmail.com',
    });
  });

  it('should update data customer with new data', async () => {
    const customerCreated = await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    const customerUpdated = await updateCustomerService.execute(
      customerCreated.id,
      {
        name: 'Rian Marlon 2',
        email: 'rianmarlon2@gmail.com',
      },
    );

    expect(customerUpdated).toMatchObject({
      id: customerCreated.id,
      name: 'Rian Marlon 2',
      email: 'rianmarlon2@gmail.com',
    });
  });

  it('should not update a data of customer', async () => {
    const customerCreated = await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });

    const customerUpdated = await updateCustomerService.execute(
      customerCreated.id,
      {
        name: '',
        email: '',
      },
    );

    expect(customerUpdated).toMatchObject({
      id: customerCreated.id,
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      createdAt: customerCreated.createdAt,
    });
  });

  it('should throw an error when not exists a customer with the id informed', async () => {
    await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });

    await expect(
      updateCustomerService.execute('teste', {
        name: 'Rian Marlon 2',
        email: 'rianmarlon2@gmail.com',
      }),
    ).rejects.toEqual({
      message: 'Customer not found',
      statusCode: 404,
    });
  });

  it('should throw an error when already exists a customer with the same email', async () => {
    const customerCreated = await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    await fakeCustomersRepository.create({
      name: 'Rian Marlon 2',
      email: 'rianmarlon2@gmail.com',
    });

    await expect(
      updateCustomerService.execute(customerCreated.id, {
        name: 'Rian Marlon 2',
        email: 'rianmarlon2@gmail.com',
      }),
    ).rejects.toEqual({
      message: 'There is already one customer with this email',
      statusCode: 400,
    });
  });
});
