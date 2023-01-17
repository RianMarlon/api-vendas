import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UUID } from '@shared/utils/uuid';

import Customer from '@modules/customers/infra/typeorm/entities/customer';
import OrderProduct from './order-product';

import { IOrder } from '@modules/orders/domain/models/order.interface';

@Entity('orders')
class Order implements IOrder {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, {
    cascade: ['insert', 'update'],
  })
  ordersProducts: OrderProduct[];

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

export default Order;
