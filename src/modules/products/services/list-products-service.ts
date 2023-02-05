import { inject, injectable } from 'tsyringe';

import { IPagination } from '@shared/domain/models/pagination.interface';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';
import { IProduct } from '../domain/models/product.interface';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<IProduct>> {
    let products = await this.redisClient.get<IPagination<IProduct>>(
      'api-vendas:products:list-all',
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, limit });
      await this.redisClient.save('api-vendas:products:list-all', products);
    }

    return products;
  }
}

export default ListProductsService;
