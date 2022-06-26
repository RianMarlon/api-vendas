import { Router, Request, Response } from 'express';

import productsRouter from '@modules/products/routes/products-routes';
import usersRouter from '@modules/users/routes/users-routes';
import sessionsRouter from '@modules/users/routes/sessions-router';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Success',
  });
});

export default routes;
