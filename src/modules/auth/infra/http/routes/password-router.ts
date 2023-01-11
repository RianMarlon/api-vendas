import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPasswordController from '../controllers/forgot-password-controller';
import ResetPasswordController from '../controllers/reset-password-controller';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  (request: Request, response: Response) =>
    forgotPasswordController.handleRequest(request, response),
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  (request: Request, response: Response) =>
    resetPasswordController.handleRequest(request, response),
);

export default passwordRouter;
