import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UUID } from '@shared/utils/uuid';

import { ICustomer } from '@modules/customers/domain/models/customer.interface';

@Entity('customers')
class Customer implements ICustomer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

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

export default Customer;
