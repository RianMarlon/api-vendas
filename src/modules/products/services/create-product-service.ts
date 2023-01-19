import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import RedisClient from '@shared/redis/redis-client';

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
  ) {}

  async execute(data: IRequest): Promise<IProduct> {
    const redisClient = new RedisClient();

    const productByName = await this.productsRepository.findByName(data.name);

    if (productByName)
      throw new AppError('There is already one product with this name');

    await redisClient.delete('api-vendas:products:list-all');
    const productCreated = await this.productsRepository.create(data);
    return productCreated;
  }
}

export default CreateProductService;
