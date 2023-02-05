import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import { IHashProvider } from '@shared/providers/hash/models/hash-provider.interface';
import { IStorageProvider } from '@shared/providers/storage/models/storage-provider.interface';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import BcryptHashProvider from '@shared/providers/hash/implementations/bcrypt-hash-provider';
import S3StorageProvider from '@shared/providers/storage/implementations/s3-storage-provider';
import DiskStorageProvider from '@shared/providers/storage/implementations/disk-storage-provider';

import { ICustomersRepository } from '@modules/customers/domain/repositories/customers-repository.interface';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository.interface';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/users-tokens-repository.interface';
import { IProductsRepository } from '@modules/products/domain/repositories/products-repository.interface';
import { IOrdersRepository } from '@modules/orders/domain/repositories/orders-repository.interface';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/customers-repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/users-tokens-repository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/products-repository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/orders-repository';
import IORedis from '@shared/redis-client/implementations/ioredis';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  uploadConfig.driver === 's3' ? S3StorageProvider : DiskStorageProvider,
);

container.registerSingleton<IRedisClient>('RedisClient', IORedis);
