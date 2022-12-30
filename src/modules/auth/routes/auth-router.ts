import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import LoginController from '../controllers/login-controller';

const loginController = new LoginController();

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

export default authRouter;
