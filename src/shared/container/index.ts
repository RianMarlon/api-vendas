import { container } from 'tsyringe';

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
