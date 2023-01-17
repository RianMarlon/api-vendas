import { IProduct } from '@modules/products/domain/models/product.interface';
import { IOrder } from './order.interface';

export interface IOrderProduct {
  id: string;
  price: number;
  quantity: number;
  orderId: string;
  productId: string;
  order: IOrder;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}
