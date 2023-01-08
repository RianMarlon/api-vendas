import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 'disk' | 's3';
  directory: string;
  tmpFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER as string,
  directory: uploadFolder,
  tmpFolder: tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${fileHash}-${Date.now()}.${fileExtension}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.BUCKET_NAME as string,
    },
  },
} as IUploadConfig;
