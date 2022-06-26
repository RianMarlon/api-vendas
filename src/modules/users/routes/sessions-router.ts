import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CreateSessionsController from '../controllers/create-sessions-controller';

const createSessionsController = new CreateSessionsController();

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request: Request, response: Response) =>
    createSessionsController.handleRequest(request, response),
);

export default sessionsRouter;
