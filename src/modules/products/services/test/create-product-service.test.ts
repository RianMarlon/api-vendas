import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';

import FakeProductsRepository from '@modules/products/domain/repositories/fakes/fake-products-repository';
import CreateProductService from '../create-product-service';

let fakeRedisClient: FakeRedisClient;
let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;

describe('CreateProductService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    fakeProductsRepository = new FakeProductsRepository();
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeRedisClient,
    );
  });

  it('should create a new product', async () => {
    const productCreated = await createProductService.execute({
      name: 'Teste',
      quantity: 10,
      price: 10,
    });

    expect(productCreated).toMatchObject({
      name: 'Teste',
      quantity: 10,
      price: 10,
    });
    expect(productCreated).toHaveProperty('id');
    expect(productCreated).toHaveProperty('createdAt');
    expect(productCreated).toHaveProperty('updatedAt');
  });

  it('should throw an error when already exists a product with the same name', async () => {
    await createProductService.execute({
      name: 'Teste',
      quantity: 10,
      price: 10,
    });

    await expect(
      createProductService.execute({
        name: 'Teste',
        quantity: 5,
        price: 5,
      }),
    ).rejects.toEqual({
      message: 'There is already one product with this name',
      statusCode: 400,
    });
  });
});
