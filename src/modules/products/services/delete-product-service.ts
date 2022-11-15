import AppError from '@shared/errors/app-error';
import RedisCache from '@shared/cache/redis-cache';

import ProductsRepository from '../typeorm/repositories/products-repository';

class DeleteProductService {
  async execute(id: string): Promise<void> {
    const productsRepository = new ProductsRepository();
    const redisCache = new RedisCache();

    const productById = await productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found');

    await redisCache.delete('api-vendas:products:list-all');
    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
