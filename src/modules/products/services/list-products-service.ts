import { inject, injectable } from 'tsyringe';

import RedisClient from '@shared/redis/redis-client';
import { IPagination } from '@shared/infra/typeorm/pagination/interfaces/pagination.interface';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';
import { IProduct } from '../domain/models/product.interface';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<IProduct>> {
    const redisClient = new RedisClient();

    let products = await redisClient.get<IPagination<IProduct>>(
      'api-vendas:products:list-all',
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, limit });
      await redisClient.save('api-vendas:products:list-all', products);
    }

    return products;
  }
}

export default ListProductsService;
