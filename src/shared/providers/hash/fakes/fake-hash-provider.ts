import { IHashProvider } from '../models/hash-provider.interface';

class FakeHashProvider implements IHashProvider {
  async generate(payload: string): Promise<string> {
    return payload;
  }
  async compare(payload: string, hash: string): Promise<boolean> {
    return payload === hash;
  }
}

export default FakeHashProvider;
