import { getRepository, Repository } from 'typeorm';

import { ICreateOrder } from '@modules/orders/domain/models/create-order.interface';
import { IOrdersRepository } from '@modules/orders/domain/repositories/orders-repository.interface';

import Order from '../entities/order';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

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
