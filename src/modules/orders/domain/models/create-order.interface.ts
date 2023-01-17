import { ICustomer } from '@modules/customers/domain/models/customer.interface';

export interface ICreateOrder {
  products: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  customer: ICustomer;
}
