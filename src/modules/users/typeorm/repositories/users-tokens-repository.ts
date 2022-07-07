import { getRepository } from 'typeorm';

import UserToken from '../entities/user-token';

class UsersTokensRepository {
  private readonly repository = getRepository(UserToken);

  async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.repository.findOne({
      where: {
        token,
      },
    });
  }

  async findById(id: string): Promise<UserToken | undefined> {
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
