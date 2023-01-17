import { IOrderProduct } from '@modules/orders/domain/models/order-product.interface';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  ordersProducts: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
