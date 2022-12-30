import AppError from '@shared/errors/app-error';

import ProductsRepository from '../typeorm/repositories/products-repository';
import RedisClient from '@shared/redis/redis-client';

class DeleteProductService {
  async execute(id: string): Promise<void> {
    const productsRepository = new ProductsRepository();
    const redisClient = new RedisClient();

    const productById = await productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found');

    await redisClient.delete('api-vendas:products:list-all');
    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
