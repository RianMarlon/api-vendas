import Product from '../typeorm/entities/product';

import ProductsRepository from '../typeorm/repositories/products-repository';

class ListProductsService {
  async execute(): Promise<Product[]> {
    const productsRepository = new ProductsRepository();

    const products = await productsRepository.findAll();

    return products;
  }
}

export default ListProductsService;
