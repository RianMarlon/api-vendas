import { IUserToken } from '../models/user-token.interface';

export interface IUsersTokensRepository {
  findByToken(token: string): Promise<IUserToken | null>;
  findById(id: string): Promise<IUserToken | null>;
  generate(userId: string): Promise<IUserToken>;
  delete(id: string): Promise<void>;
}
