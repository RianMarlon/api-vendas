import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { getClientIp } from 'request-ip';

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
    const tokenPayload = verify(token, auth.jwt.secret) as JwtPayload;

    const clientIpOfTokenPayload = tokenPayload.clientIp;
    const clientIpOfRequest = getClientIp(request);

    if (clientIpOfTokenPayload !== clientIpOfRequest) {
      throw new AppError('Invalid JWT Token');
    }

    request.user = {
      id: tokenPayload.id,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token');
  }
}

export default isAuthenticated;
