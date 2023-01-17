import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UUID } from '@shared/utils/uuid';

import Product from '@modules/products/infra/typeorm/entities/product';
import Order from './order';

import { IOrderProduct } from '@modules/orders/domain/models/order-product.interface';

@Entity('orders_products')
class OrderProduct implements IOrderProduct {
  @PrimaryColumn()
  id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Order, order => order.ordersProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.ordersProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      const uuid = new UUID();
      this.id = uuid.generate();
    }
  }
}

export default OrderProduct;
