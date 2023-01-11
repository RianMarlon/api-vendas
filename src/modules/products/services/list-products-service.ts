import { IPagination } from '@shared/interfaces/pagination.interface';
import RedisClient from '@shared/redis/redis-client';

import Product from '../infra/typeorm/entities/product';

import ProductsRepository from '../infra/typeorm/repositories/products-repository';

class ListProductsService {
  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<Product>> {
    const productsRepository = new ProductsRepository();
    const redisClient = new RedisClient();

    let products = await redisClient.get<IPagination<Product>>(
      'api-vendas:products:list-all',
    );

    if (!products) {
      products = await productsRepository.findAll({ page, limit });
      await redisClient.save('api-vendas:products:list-all', products);
    }

    return products;
  }
}

export default ListProductsService;
