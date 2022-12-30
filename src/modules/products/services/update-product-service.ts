import AppError from '@shared/errors/app-error';

import RedisClient from '@shared/redis/redis-client';

import Product from '../typeorm/entities/product';

import ProductsRepository from '../typeorm/repositories/products-repository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  async execute(id: string, data: IRequest): Promise<Product> {
    const productsRepository = new ProductsRepository();
    const redisClient = new RedisClient();

    const productById = await productsRepository.findById(id);

    if (!productById) throw new AppError('Product not found');

    if (data.name) {
      const productByName = await productsRepository.findByName(data.name);

      if (productByName && productByName.id !== productById.id)
        throw new AppError('There is already one product with this name');
    }

    const newProduct = {
      ...productById,
      ...data,
    };

    const productToUpdate = new Product();
    productToUpdate.id = id;
    productToUpdate.name = newProduct.name;
    productToUpdate.price = newProduct.price;
    productToUpdate.quantity = newProduct.quantity;

    await redisClient.delete('api-vendas:products:list-all');
    const productUpdated = await productsRepository.update(id, productToUpdate);
    return productUpdated;
  }
}

export default UpdateProductService;
