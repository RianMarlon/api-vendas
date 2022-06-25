import { genSalt, hash, compare } from 'bcryptjs';

class Hash {
  async generate(data: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return await compare(data, hash);
  }
}

export default Hash;
