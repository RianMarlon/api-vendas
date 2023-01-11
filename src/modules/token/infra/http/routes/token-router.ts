import { Request, Response, Router } from 'express';

import isValidRefreshToken from '@shared/infra/http/middlewares/is-valid-refresh-token';

import GenerateAccessTokenController from '../controllers/generate-access-token-controller';

const generateAccessTokenController = new GenerateAccessTokenController();

const tokenRouter = Router();

tokenRouter.post(
  '/refresh',
  isValidRefreshToken,
  (request: Request, response: Response) =>
    generateAccessTokenController.handleRequest(request, response),
);

export default tokenRouter;
