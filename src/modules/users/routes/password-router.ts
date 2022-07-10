import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPasswordController from '../controllers/forgot-password-controller';

const forgotPasswordController = new ForgotPasswordController();

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

export default passwordRouter;
