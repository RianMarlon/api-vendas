import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import { IStorageProvider } from '../models/storage-provider.interface';

class DiskStorageProvider implements IStorageProvider {
  async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.directory, filename),
    );

    return filename;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
