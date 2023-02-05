import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import { IProductsRepository } from '../domain/repositories/products-repository.interface';
import { IProduct } from '../domain/models/product.interface';

interface IRequest {
  name?: string;
  price?: number;
  quantity?: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(id: string, data: IRequest): Promise<IProduct> {
    const productById = await this.productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found', 404);

    if (data.name) {
      const productByName = await this.productsRepository.findByName(data.name);

      if (productByName && productByName.id !== productById.id)
        throw new AppError('There is already one product with this name');
    }

    const newProduct = {
      ...productById,
      ...data,
    };

    await this.redisClient.delete('api-vendas:products:list-all');
    const productUpdated = await this.productsRepository.update(id, {
      name: newProduct.name,
      price: newProduct.price,
      quantity: newProduct.quantity,
    });
    return productUpdated;
  }
}

export default UpdateProductService;
