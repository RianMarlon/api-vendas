import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/app-error';
import auth from '@config/auth';

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) throw new AppError('JWT Token is missing');

  try {
    const tokenPayload = verify(token, auth.jwt.secret);

    request.user = {
      id: tokenPayload.sub as string,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token');
  }
}

export default isAuthenticated;
