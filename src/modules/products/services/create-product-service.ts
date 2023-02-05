import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';
import { IProduct } from '../domain/models/product.interface';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(data: IRequest): Promise<IProduct> {
    const productByName = await this.productsRepository.findByName(data.name);

    if (productByName)
      throw new AppError('There is already one product with this name');

    await this.redisClient.delete('api-vendas:products:list-all');
    const productCreated = await this.productsRepository.create(data);
    return productCreated;
  }
}

export default CreateProductService;
