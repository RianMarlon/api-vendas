import fs from 'fs';
import path from 'path';
import { S3 } from '@aws-sdk/client-s3';
import mime from 'mime-types';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/app-error';
import { IStorageProvider } from '../models/storage-provider.interface';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  async saveFile(filename: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, filename);
    const contentType = mime.contentType(originalPath);

    if (!contentType) {
      throw new AppError('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: filename,
      Body: fileContent,
      ContentType: contentType,
    });

    await fs.promises.unlink(originalPath);

    return filename;
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: filename,
    });
  }
}

export default S3StorageProvider;
