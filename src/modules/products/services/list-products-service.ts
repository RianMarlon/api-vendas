import { IPagination } from '@shared/interfaces/pagination.interface';

import Product from '../typeorm/entities/product';

import ProductsRepository from '../typeorm/repositories/products-repository';

class ListProductsService {
  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<Product>> {
    const productsRepository = new ProductsRepository();

    const products = await productsRepository.findAll({ page, limit });

    return products;
  }
}

export default ListProductsService;
