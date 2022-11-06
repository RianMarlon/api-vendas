import AppError from '@shared/errors/app-error';

import Order from '../typeorm/entities/order';

import CustomersRepository from '@modules/customers/typeorm/repositories/customers-repository';
import ProductsRepository from '@modules/products/typeorm/repositories/products-repository';
import OrdersRepository from '../typeorm/repositories/orders-repository';

interface IRequest {
  customerId: string;
  products: {
    id: string;
    quantity: number;
  }[];
}

class CreateOrderService {
  async execute({ customerId, products }: IRequest): Promise<Order> {
    const ordersRepository = new OrdersRepository();
    const customersRepository = new CustomersRepository();
    const productsRepository = new ProductsRepository();

    const customerById = await customersRepository.findById(customerId);

    if (!customerById)
      throw new AppError('Could not find any customer with the given id.');

    const productsIds = products.map(product => product.id);
    const productsByIds = await productsRepository.findAllByIds(productsIds);
    const existentsProductsIds = productsByIds.map(product => product.id);

    if (!productsByIds.length)
      throw new AppError('Could not find any product with the given id.');

    const inexistentProducts = products.filter(
      product => !existentsProductsIds.includes(product.id),
    );

    if (inexistentProducts.length)
      throw new AppError(`Could not find product ${inexistentProducts[0].id}.`);

    const productsWithQuantityAvailable = products.filter(product =>
      productsByIds.find(
        productExistent =>
          productExistent.id === product.id &&
          productExistent.quantity <= product.quantity,
      ),
    );

    if (productsWithQuantityAvailable)
      throw new AppError(
        `The quantity ${productsWithQuantityAvailable[0].quantity} is not available for ${productsWithQuantityAvailable[0].id}`,
      );

    const orderCreated = await ordersRepository.create({
      customer: customerById,
      products: productsByIds,
    });

    const { ordersProducts } = orderCreated;

    const updatedProductsQuantity = ordersProducts.map(product => {
      const productById = productsByIds.filter(
        productExistent => productExistent.id === product.id,
      )[0];

      return {
        ...productById,
        quantity: productById.quantity - product.quantity,
      };
    });
    await productsRepository.updateProducts(updatedProductsQuantity);

    return orderCreated;
  }
}

export default CreateOrderService;
