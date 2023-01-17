import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UUID } from '@shared/utils/uuid';

import { IUserToken } from '../../../domain/models/user-token.interface';

@Entity('users_tokens')
class UserToken implements IUserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    const uuid = new UUID();

    if (!this.id) {
      this.id = uuid.generate();
    }

    if (!this.token) {
      this.token = uuid.generate();
    }
  }
}

export default UserToken;
