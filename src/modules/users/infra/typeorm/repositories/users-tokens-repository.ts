import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';

import UserToken from '../entities/user-token';

import { IUsersTokensRepository } from '@modules/users/domain/repositories/users-tokens-repository.interface';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | null> {
    return await this.repository.findOne({
      where: {
        token,
      },
    });
  }

  async findById(id: string): Promise<UserToken | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async generate(userId: string): Promise<UserToken> {
    const tokenGenerated = this.repository.create({
      userId,
    });
    await this.repository.save(tokenGenerated);

    return tokenGenerated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersTokensRepository;
