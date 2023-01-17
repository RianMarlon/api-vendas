import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UUID } from '@shared/utils/uuid';

import OrderProduct from '@modules/orders/infra/typeorm/entities/order-product';
import { IProduct } from '@modules/products/domain/models/product.interface';

@Entity('products')
class Product implements IProduct {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
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

export default Product;
