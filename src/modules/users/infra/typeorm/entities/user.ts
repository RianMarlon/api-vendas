import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { UUID } from '@shared/utils/uuid';

import { IUser } from '../../../domain/models/user.interface';

@Entity('users')
class User implements IUser {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      const uuid = new UUID();
      this.id = uuid.generate();
    }
  }
}

export default User;
