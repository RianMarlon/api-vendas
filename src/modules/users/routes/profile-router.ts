import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ShowProfileController from '../controllers/show-profile-controller';
import UpdateProfileController from '../controllers/update-profile-controller';
import isAuthenticated from '@shared/http/middlewares/is-authenticated';

const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

const profileRouter = Router();

profileRouter.use(isAuthenticated);

profileRouter.get('/', (request: Request, response: Response) =>
  showProfileController.handleRequest(request, response),
);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      oldPassword: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  (request: Request, response: Response) =>
    updateProfileController.handleRequest(request, response),
);

export default profileRouter;
