import { ICustomer } from '@modules/customers/domain/models/customer.interface';
import { IOrderProduct } from './order-product.interface';

export interface IOrder {
  id: string;
  customer: ICustomer;
  ordersProducts: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
