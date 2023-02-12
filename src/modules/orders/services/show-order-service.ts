import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IOrdersRepository } from '../domain/repositories/orders-repository.interface';
import { IOrder } from '../domain/models/order.interface';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(id: string): Promise<IOrder | null> {
    const orderById = await this.ordersRepository.findById(id);

    if (!orderById) throw new AppError('Order not found', 404);

    return orderById;
  }
}

export default ShowOrderService;
