import { IPagination } from '@shared/interfaces/pagination.interface';
import RedisCache from '@shared/cache/redis-cache';

import Product from '../typeorm/entities/product';

import ProductsRepository from '../typeorm/repositories/products-repository';

class ListProductsService {
  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<Product>> {
    const productsRepository = new ProductsRepository();
    const redisCache = new RedisCache();

    let products = await redisCache.get<IPagination<Product>>(
      'api-vendas:products:list-all',
    );

    if (!products) {
      products = await productsRepository.findAll({ page, limit });
      await redisCache.save('api-vendas:products:list-all', products);
    }

    return products;
  }
}

export default ListProductsService;
