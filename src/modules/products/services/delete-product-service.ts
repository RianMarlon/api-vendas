import AppError from '@shared/errors/app-error';

import ProductsRepository from '../typeorm/repositories/products-repository';

class DeleteProductService {
  async execute(id: string): Promise<void> {
    const productsRepository = new ProductsRepository();
    const productById = await productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found');

    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
