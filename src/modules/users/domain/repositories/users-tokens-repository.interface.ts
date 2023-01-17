import { IUserToken } from '../models/user-token.interface';

export interface IUsersTokensRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  findById(id: string): Promise<IUserToken | undefined>;
  generate(userId: string): Promise<IUserToken>;
  delete(id: string): Promise<void>;
}
