import { DataSource } from 'typeorm';

import config from '@config/index';

// Entities
import Product from '@modules/products/infra/typeorm/entities/product';
import User from '@modules/users/infra/typeorm/entities/user';
import UserToken from '@modules/users/infra/typeorm/entities/user-token';
import Customer from '@modules/customers/infra/typeorm/entities/customer';
import Order from '@modules/orders/infra/typeorm/entities/order';
import OrderProduct from '@modules/orders/infra/typeorm/entities/order-product';

// Migrations
import { CreateProducts1654992125312 } from './migrations/1654992125312-create-products';
import { CreateUsers1655667574214 } from './migrations/1655667574214-create-users';
import { CreateUsersTokens1657234322322 } from './migrations/1657234322322-create-users-tokens';
import { CreateCustomers1667425374644 } from './migrations/1667425374644-create-customers';
import { CreateOrders1667747127437 } from './migrations/1667747127437-create-orders';
import { CreateOrdersProducts1667747843958 } from './migrations/1667747843958-create-orders-products';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.TYPEORM_HOST,
  port: Number(config.TYPEORM_PORT),
  password: config.TYPEORM_PASSWORD,
  username: config.TYPEORM_USERNAME,
  database: config.TYPEORM_DATABASE,
  entities: [User, UserToken, Customer, Product, Order, OrderProduct],
  migrations: [
    CreateProducts1654992125312,
    CreateUsers1655667574214,
    CreateUsersTokens1657234322322,
    CreateCustomers1667425374644,
    CreateOrders1667747127437,
    CreateOrdersProducts1667747843958,
  ],
});
