import { Router, Request, Response } from 'express';

import productsRouter from '@modules/products/infra/http/routes/products-routes';
import usersRouter from '@modules/users/infra/http/routes/users-routes';
import authRouter from '@modules/auth/infra/http/routes/auth-router';
import passwordRouter from '@modules/auth/infra/http/routes/password-router';
import profileRouter from '@modules/users/infra/http/routes/profile-router';
import customersRouter from '@modules/customers/infra/http/routes/customers-routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders-routes';
import tokenRouter from '@modules/token/infra/http/routes/token-router';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/token', tokenRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/status', (request, response) => {
  return response.status(200).json();
});

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Success',
  });
});

export default routes;
