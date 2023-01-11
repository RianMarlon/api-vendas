import AppError from '@shared/errors/app-error';

import Order from '../infra/typeorm/entities/order';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/customers-repository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/products-repository';
import OrdersRepository from '../infra/typeorm/repositories/orders-repository';

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

    const productsWithQuantityUnavailable = products.filter(product =>
      productsByIds.find(
        productExistent =>
          productExistent.id === product.id &&
          productExistent.quantity < product.quantity,
      ),
    );

    if (productsWithQuantityUnavailable.length)
      throw new AppError(
        `The quantity ${productsWithQuantityUnavailable[0].quantity} is not available for ${productsWithQuantityUnavailable[0].id}`,
      );

    const productsToOrder = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: productsByIds.filter(
        productById => productById.id === product.id,
      )[0].price,
    }));

    const orderCreated = await ordersRepository.create({
      customer: customerById,
      products: productsToOrder,
    });

    const { ordersProducts } = orderCreated;

    const updatedProductsQuantity = ordersProducts.map(orderProduct => {
      const product = productsByIds.filter(
        product => product.id === orderProduct.productId,
      )[0];

      return {
        ...product,
        quantity: product.quantity - orderProduct.quantity,
      };
    });
    await productsRepository.updateProducts(updatedProductsQuantity);

    return orderCreated;
  }
}

export default CreateOrderService;
