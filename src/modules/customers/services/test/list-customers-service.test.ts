import 'reflect-metadata';

import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/fake-customers-repository';
import ListCustomersService from '../list-customers-service';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomersService: ListCustomersService;

describe('ListCustomersService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomersService = new ListCustomersService(fakeCustomersRepository);
  });

  it('should return the first 3 customers', async () => {
    // Creating some customers
    for (let i = 0; i < 10; i++) {
      await fakeCustomersRepository.create({
        name: `Rian Marlon`,
        email: `rianmarlon${i}@gmail.com`,
      });
    }
    const customers = await listCustomersService.execute(1, 3);

    expect(customers.items.length).toEqual(3);
    expect(customers.metadata.currentPage).toEqual(1);
    expect(customers.metadata.itemsPerPage).toEqual(3);
    expect(customers.metadata.quantityItemsReturned).toEqual(3);
    expect(customers.metadata.totalItems).toEqual(10);
    expect(customers.metadata.totalPages).toEqual(4);
  });
});
