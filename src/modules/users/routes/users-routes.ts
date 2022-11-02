import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ListUsersController from '../controllers/list-users-controller';
import CreateUserController from '../controllers/create-user-controller';
import UpdateUserAvatarController from '../controllers/update-user-avatar-controller';
import DeleteUserController from '../controllers/delete-user-controller';
import isAuthenticated from '@shared/http/middlewares/is-authenticated';

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const deleteUserController = new DeleteUserController();

const usersRouter = Router();

usersRouter.get('/', (request: Request, response: Response) =>
  listUsersController.handleRequest(request, response),
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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  multer(uploadConfig).single('avatar'),
  (request: Request, response: Response) =>
    updateUserAvatarController.handleRequest(request, response),
);

usersRouter.delete(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    deleteUserController.handleRequest(request, response),
);

export default usersRouter;
