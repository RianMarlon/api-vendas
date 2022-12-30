import { Router, Request, Response } from 'express';

import productsRouter from '@modules/products/routes/products-routes';
import usersRouter from '@modules/users/routes/users-routes';
import authRouter from '@modules/auth/routes/auth-router';
import passwordRouter from '@modules/users/routes/password-router';
import profileRouter from '@modules/users/routes/profile-router';
import customersRouter from '@modules/customers/routes/customers-routes';
import ordersRouter from '@modules/orders/routes/orders-routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Success',
  });
});

export default routes;
