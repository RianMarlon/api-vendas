import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import AppError from '@shared/errors/app-error';
import auth from '@config/auth';

async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];

  try {
    if (!token) throw new AppError('Unauthorized', 401);

    const tokenPayload = verify(token, auth.accessTokenSecret, {
      audience: 'urn:jwt:type:access',
    }) as JwtPayload;

    request.user = {
      id: tokenPayload.sub as string,
    };

    return next();
  } catch (error) {
    throw new AppError('Unauthorized', 401);
  }
}

export default isAuthenticated;
