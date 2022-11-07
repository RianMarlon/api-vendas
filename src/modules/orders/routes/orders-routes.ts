import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/is-authenticated';

import ShowOrderController from '../controllers/show-order-controller';
import CreateOrderController from '../controllers/create-order-controller';

const showOrderController = new ShowOrderController();
const createOrderController = new CreateOrderController();

const ordersRouter = Router();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    showOrderController.handleRequest(request, response),
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.string().uuid().required(),
      products: Joi.array()
        .items({
          id: Joi.string().uuid().required(),
          quantity: Joi.number().integer().positive().required(),
        })
        .required(),
    },
  }),
  (request: Request, response: Response) =>
    createOrderController.handleRequest(request, response),
);

export default ordersRouter;
