import { IStorageProvider } from '../models/storage-provider.interface';

class FakeStorageProvider implements IStorageProvider {
  async saveFile(filename: string): Promise<string> {
    return filename;
  }

  async deleteFile(filename: string): Promise<void> {
    return;
  }
}

export default FakeStorageProvider;
