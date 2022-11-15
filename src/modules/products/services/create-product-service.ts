import AppError from '@shared/errors/app-error';
import RedisCache from '@shared/cache/redis-cache';

import Product from '../typeorm/entities/product';

import ProductsRepository from '../typeorm/repositories/products-repository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  async execute(data: IRequest): Promise<Product> {
    const productsRepository = new ProductsRepository();
    const redisCache = new RedisCache();

    const productByName = await productsRepository.findByName(data.name);

    if (productByName)
      throw new AppError('There is already one product with this name');

    const productToCreate = new Product();
    productToCreate.name = data.name;
    productToCreate.price = data.price;
    productToCreate.quantity = data.quantity;

    await redisCache.delete('api-vendas:products:list-all');
    const productCreated = await productsRepository.create(productToCreate);
    return productCreated;
  }
}

export default CreateProductService;
