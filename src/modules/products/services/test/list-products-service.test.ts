import 'reflect-metadata';

import FakeProductsRepository from '@modules/products/domain/repositories/fakes/fake-products-repository';
import ListProductsService from '../list-products-service';
import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';

let fakeRedisClient: FakeRedisClient;
let fakeProductsRepository: FakeProductsRepository;
let listProductsService: ListProductsService;

describe('ListProductsService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    fakeProductsRepository = new FakeProductsRepository();
    listProductsService = new ListProductsService(
      fakeProductsRepository,
      fakeRedisClient,
    );
  });

  it('should return the first 3 products', async () => {
    // Creating some customers
    for (let i = 0; i < 10; i++) {
      await fakeProductsRepository.create({
        name: `Rian Marlon`,
        quantity: 10,
        price: 10,
      });
    }
    const products = await listProductsService.execute(1, 3);

    expect(products.items.length).toEqual(3);
    expect(products.metadata.currentPage).toEqual(1);
    expect(products.metadata.itemsPerPage).toEqual(3);
    expect(products.metadata.quantityItemsReturned).toEqual(3);
    expect(products.metadata.totalItems).toEqual(10);
    expect(products.metadata.totalPages).toEqual(4);
  });
});
