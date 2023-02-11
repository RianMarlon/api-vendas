import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';

import FakeProductsRepository from '@modules/products/domain/repositories/fakes/fake-products-repository';
import UpdateProductService from '../update-product-service';

let fakeRedisClient: FakeRedisClient;
let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductService;

describe('UpdateProductService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    fakeProductsRepository = new FakeProductsRepository();
    updateProductService = new UpdateProductService(
      fakeProductsRepository,
      fakeRedisClient,
    );
  });

  it('should update an existent product', async () => {
    const productCreated = await fakeProductsRepository.create({
      name: 'Teste',
      quantity: 10,
      price: 10,
    });

    const productUpdated = await updateProductService.execute(
      productCreated.id,
      {
        quantity: 20,
        price: 8,
      },
    );

    expect(productUpdated).toMatchObject({
      name: 'Teste',
      quantity: 20,
      price: 8,
    });
  });

  it('should throw an error when not exists a product with the id', async () => {
    await fakeProductsRepository.create({
      name: 'Teste',
      price: 10,
      quantity: 10,
    });

    await expect(
      updateProductService.execute('teste', {
        price: 8,
        quantity: 20,
      }),
    ).rejects.toEqual({
      message: 'Product not found',
      statusCode: 404,
    });
  });

  it('should throw an error when already exists a product with the same name', async () => {
    const productCreated = await fakeProductsRepository.create({
      name: 'Teste',
      price: 10,
      quantity: 10,
    });

    await fakeProductsRepository.create({
      name: 'Teste 2',
      price: 10,
      quantity: 10,
    });

    await expect(
      updateProductService.execute(productCreated.id, {
        name: 'Teste 2',
      }),
    ).rejects.toEqual({
      message: 'There is already one product with this name',
      statusCode: 400,
    });
  });
});
