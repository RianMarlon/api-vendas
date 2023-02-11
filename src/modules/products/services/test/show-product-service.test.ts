import 'reflect-metadata';

import FakeProductsRepository from '@modules/products/domain/repositories/fakes/fake-products-repository';
import ShowProductService from '../show-product-service';

let fakeProductsRepository: FakeProductsRepository;
let showProductService: ShowProductService;

describe('ShowProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    showProductService = new ShowProductService(fakeProductsRepository);
  });

  it('should return the product data by id', async () => {
    const productCreated = await fakeProductsRepository.create({
      name: 'Teste',
      price: 10,
      quantity: 1,
    });

    const productFounded = await showProductService.execute(productCreated.id);
    expect(productFounded).toMatchObject(productCreated);
  });

  it('should throw an error when not exists a product with id', async () => {
    await fakeProductsRepository.create({
      name: 'Teste',
      price: 10,
      quantity: 10,
    });

    await expect(showProductService.execute('teste')).rejects.toEqual({
      message: 'Product not found',
      statusCode: 404,
    });
  });
});
