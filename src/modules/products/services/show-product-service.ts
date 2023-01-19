import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';
import { IProduct } from '../domain/models/product.interface';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(id: string): Promise<IProduct | undefined> {
    const productById = await this.productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found', 404);

    return productById;
  }
}

export default ShowProductService;
