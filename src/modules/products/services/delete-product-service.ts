import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(id: string): Promise<void> {
    const productById = await this.productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found', 404);

    await this.redisClient.delete('api-vendas:products:list-all');
    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
