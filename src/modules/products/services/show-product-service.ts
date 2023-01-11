import AppError from '@shared/errors/app-error';

import Product from '../infra/typeorm/entities/product';

import ProductsRepository from '../infra/typeorm/repositories/products-repository';

class ShowProductService {
  async execute(id: string): Promise<Product | undefined> {
    const productsRepository = new ProductsRepository();
    const productById = await productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found', 404);

    return productById;
  }
}

export default ShowProductService;
