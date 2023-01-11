import { getRepository } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/customer';
import Order from '../entities/order';

interface ICreateOrder {
  products: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  customer: Customer;
}

class OrdersRepository {
  private readonly repository = getRepository(Order);

  async findById(id: string): Promise<Order | undefined> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: ['customer', 'ordersProducts'],
    });
  }

  async create({ customer, products }: ICreateOrder): Promise<Order> {
    const orderCreated = this.repository.create({
      customer: customer,
      ordersProducts: products,
    });
    await this.repository.save(orderCreated);

    return orderCreated;
  }
}

export default OrdersRepository;
