import AppError from '@shared/errors/app-error';
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

    const productUpdated = await productsRepository.update(id, newProduct);
    return productUpdated;
  }
}

export default UpdateProductService;
