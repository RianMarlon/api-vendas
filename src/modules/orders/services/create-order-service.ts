import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IOrdersRepository } from '../domain/repositories/orders-repository.interface';
import { ICustomersRepository } from '@modules/customers/domain/repositories/customers-repository.interface';
import { IProductsRepository } from '@modules/products/domain/repositories/products-repository.interface';
import { IOrder } from '../domain/models/order.interface';

interface IRequest {
  customerId: string;
  products: {
    id: string;
    quantity: number;
  }[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ customerId, products }: IRequest): Promise<IOrder> {
    products = products.reduce(
      (productsById, product) => {
        const productIndex = productsById.findIndex(
          productById => productById.id === product.id,
        );

        if (productIndex === -1) {
          productsById.push(product);
        } else {
          productsById[productIndex].quantity += product.quantity;
        }

        return productsById;
      },
      [] as {
        id: string;
        quantity: number;
      }[],
    );
    const customerById = await this.customersRepository.findById(customerId);

    if (!customerById)
      throw new AppError('Could not find any customer with the given id', 404);

    const productsIds = products.map(product => product.id);
    const productsByIds = await this.productsRepository.findAllByIds(
      productsIds,
    );
    const existentsProductsIds = productsByIds.map(product => product.id);

    if (!productsByIds.length)
      throw new AppError('Could not find any product with the given id', 404);

    const inexistentProducts = products.filter(
      product => !existentsProductsIds.includes(product.id),
    );

    if (inexistentProducts.length)
      throw new AppError(
        `Could not find product ${inexistentProducts[0].id}`,
        404,
      );

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

    const orderCreated = await this.ordersRepository.create({
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
    await this.productsRepository.updateProducts(updatedProductsQuantity);

    return orderCreated;
  }
}

export default CreateOrderService;
