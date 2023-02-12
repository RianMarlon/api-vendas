import { ICreateOrder } from '../models/create-order.interface';
import { IOrder } from '../models/order.interface';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  create({ customer, products }: ICreateOrder): Promise<IOrder>;
}
