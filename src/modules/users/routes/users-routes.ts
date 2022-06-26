import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ListUsersController from '../controllers/list-users-controller';
import ShowUserController from '../controllers/show-user-controller';
import CreateUserController from '../controllers/create-user-controller';
import UpdateUserController from '../controllers/update-user-controller';
import DeleteUserController from '../controllers/delete-user-controller';

const listUsersController = new ListUsersController();
const showUserController = new ShowUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const usersRouter = Router();

usersRouter.get('/', (request: Request, response: Response) =>
  listUsersController.handleRequest(request, response),
);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    showUserController.handleRequest(request, response),
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request: Request, response: Response) =>
    createUserController.handleRequest(request, response),
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
    },
  }),
  (request: Request, response: Response) =>
    updateUserController.handleRequest(request, response),
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    deleteUserController.handleRequest(request, response),
);

export default usersRouter;
