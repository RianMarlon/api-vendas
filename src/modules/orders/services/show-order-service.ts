import AppError from '@shared/errors/app-error';

import Order from '../infra/typeorm/entities/order';

import OrdersRepository from '../infra/typeorm/repositories/orders-repository';

class ShowOrderService {
  async execute(id: string): Promise<Order | undefined> {
    const ordersRepository = new OrdersRepository();
    const orderById = await ordersRepository.findById(id);

    if (!orderById) throw new AppError('Order not found', 404);

    return orderById;
  }
}

export default ShowOrderService;
