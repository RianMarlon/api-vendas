import { genSalt, hash, compare } from 'bcryptjs';
import { IHashProvider } from '../models/hash-provider.interface';

class BcryptHashProvider implements IHashProvider {
  async generate(payload: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(payload, salt);
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return await compare(payload, hash);
  }
}

export default BcryptHashProvider;
