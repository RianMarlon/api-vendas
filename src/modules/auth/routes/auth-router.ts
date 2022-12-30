import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isValidRefreshToken from '@shared/http/middlewares/is-valid-refresh-token';

import LoginController from '../controllers/login-controller';
import LogoutController from '../controllers/logout-controller';

const loginController = new LoginController();
const logoutController = new LogoutController();

const authRouter = Router();

authRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request: Request, response: Response) =>
    loginController.handleRequest(request, response),
);

authRouter.post(
  '/logout',
  isValidRefreshToken,
  (request: Request, response: Response) =>
    logoutController.handleRequest(request, response),
);

export default authRouter;
