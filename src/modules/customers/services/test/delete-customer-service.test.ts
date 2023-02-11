import 'reflect-metadata';

import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/fake-customers-repository';
import DeleteCustomerService from '../delete-customer-service';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomerService = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('should delete a customer with the id', async () => {
    const customerCreated = await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    expect(
      await deleteCustomerService.execute(customerCreated.id),
    ).toBeUndefined();
  });

  it('should throw an error when not exists a customer with the id', async () => {
    await fakeCustomersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    await expect(deleteCustomerService.execute('teste')).rejects.toMatchObject({
      message: 'Customer not found',
      statusCode: 404,
    });
  });
});
