import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'crypto';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';

import AppError from '@shared/errors/app-error';

import FindRefreshTokenByHashService from '@modules/token/services/find-refresh-token-by-hash';

async function isValidRefreshToken(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const refreshToken = request.headers['refresh-token'] as string;
  if (!refreshToken) throw new AppError('Unauthorized', 401);

  try {
    verify(refreshToken, auth.refreshTokenSecret, {
      audience: 'urn:jwt:type:refresh',
    });
    const refreshTokenHash = createHmac('sha512', auth.refreshTokenSecret)
      .update(refreshToken)
      .digest('hex');

    const findRefreshTokenByHashService = new FindRefreshTokenByHashService();
    const refreshTokenByHash = await findRefreshTokenByHashService.execute(
      refreshTokenHash,
    );

    if (!refreshTokenByHash) throw new AppError('Unauthorized', 401);

    request.refreshTokenHash = refreshTokenHash;
    request.user = {
      id: refreshTokenByHash.userId,
    };
    return next();
  } catch (error) {
    throw new AppError('Unauthorized', 401);
  }
}

export default isValidRefreshToken;
