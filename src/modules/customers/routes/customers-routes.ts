import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/is-authenticated';

import ListCustomersController from '../controllers/list-customers-controller';
import ShowCustomerController from '../controllers/show-customer-controller';
import CreateCustomerController from '../controllers/create-customer-controller';
import UpdateCustomerController from '../controllers/update-customer-controller';
import DeleteCustomerController from '../controllers/delete-customer-controller';

const listCustomersController = new ListCustomersController();
const showCustomerController = new ShowCustomerController();
const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();

const customersRouter = Router();

customersRouter.use(isAuthenticated);

customersRouter.get('/', (request: Request, response: Response) =>
  listCustomersController.handleRequest(request, response),
);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    showCustomerController.handleRequest(request, response),
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  (request: Request, response: Response) =>
    createCustomerController.handleRequest(request, response),
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
    },
  }),
  (request: Request, response: Response) =>
    updateCustomerController.handleRequest(request, response),
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    deleteCustomerController.handleRequest(request, response),
);

export default customersRouter;
