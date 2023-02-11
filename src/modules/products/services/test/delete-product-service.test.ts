import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';

import FakeProductsRepository from '@modules/products/domain/repositories/fakes/fake-products-repository';
import DeleteProductService from '../delete-product-service';

let fakeRedisClient: FakeRedisClient;
let fakeProductsRepository: FakeProductsRepository;
let deleteProductService: DeleteProductService;

describe('DeleteProductService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    fakeProductsRepository = new FakeProductsRepository();
    deleteProductService = new DeleteProductService(
      fakeProductsRepository,
      fakeRedisClient,
    );
  });

  it('should delete an existent product', async () => {
    const productCreated = await fakeProductsRepository.create({
      name: 'Teste',
      quantity: 10,
      price: 10,
    });

    expect(
      await deleteProductService.execute(productCreated.id),
    ).toBeUndefined();
  });

  it('should throw an error when not exists a product with the id', async () => {
    await fakeProductsRepository.create({
      name: 'Teste',
      quantity: 10,
      price: 10,
    });

    await expect(deleteProductService.execute('teste')).rejects.toEqual({
      message: 'Product not found',
      statusCode: 404,
    });
  });
});
