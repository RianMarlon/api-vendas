import { UUID } from '@shared/utils/uuid';

import { IUsersTokensRepository } from '../users-tokens-repository.interface';
import { IUserToken } from '../../models/user-token.interface';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: IUserToken[] = [];

  async findByToken(token: string): Promise<IUserToken | null> {
    return this.usersTokens.find(userToken => userToken.token === token) || null;
  }

  async findById(id: string): Promise<IUserToken | null> {
    return this.usersTokens.find(userToken => userToken.id === id) || null;
  }

  async generate(userId: string): Promise<IUserToken> {
    const uuid = new UUID();
    const userToken = {
      id: uuid.generate(),
      token: uuid.generate(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IUserToken;

    this.usersTokens.push(userToken);

    return userToken;
  }

  async updateCreatedAt(id: string, newCreatedAt: Date): Promise<IUserToken> {
    const indexOfUserToken = this.usersTokens.findIndex(
      token => token.id === id,
    );
    const newUserToken = {
      ...this.usersTokens[indexOfUserToken],
      createdAt: newCreatedAt,
      updatedAt: new Date(),
    } as IUserToken;

    this.usersTokens[indexOfUserToken] = newUserToken;

    return newUserToken;
  }

  async delete(id: string): Promise<void> {
    const indexOfUserToken = this.usersTokens.findIndex(
      userToken => userToken.id === id,
    );
    this.usersTokens.splice(indexOfUserToken, 1);
  }
}

export default FakeUsersTokensRepository;
