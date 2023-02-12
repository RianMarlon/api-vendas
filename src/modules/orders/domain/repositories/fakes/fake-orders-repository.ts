import { UUID } from '@shared/utils/uuid';

import { ICreateOrder } from '../../models/create-order.interface';
import { IOrder } from '../../models/order.interface';
import { IOrdersRepository } from '../orders-repository.interface';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: IOrder[] = [];

  async findById(id: string): Promise<IOrder | null> {
    return this.orders.find(order => order.id === id) || null;
  }

  async create({ customer, products }: ICreateOrder): Promise<IOrder> {
    const uuid = new UUID();
    const order = {
      id: uuid.generate(),
      customer,
      ordersProducts: products,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IOrder;

    this.orders.push(order);

    return order;
  }
}

export default FakeOrdersRepository;
