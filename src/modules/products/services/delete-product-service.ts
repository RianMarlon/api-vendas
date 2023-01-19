import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import RedisClient from '@shared/redis/redis-client';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const redisClient = new RedisClient();

    const productById = await this.productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found');

    await redisClient.delete('api-vendas:products:list-all');
    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
