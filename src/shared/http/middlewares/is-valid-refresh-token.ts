import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { addMinutes } from 'date-fns';

import auth from '@config/auth';

import AppError from '@shared/errors/app-error';

import FindRefreshTokenByHashService from '@modules/token/services/find-refresh-token-by-hash';
import DeleteRefreshTokenService from '@modules/token/services/delete-refresh-token-service';

async function isValidRefreshToken(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const refreshToken = request.cookies['refresh-token'];
  const authHeader = request.headers.authorization;
  const accessToken = authHeader?.split(' ')[1];

  try {
    if (!accessToken) throw new AppError('Unauthorized');
    if (!refreshToken) throw new AppError('Unauthorized');
    const accessTokenPayload = verify(accessToken, auth.accessTokenSecret, {
      ignoreExpiration: true,
    }) as JwtPayload;

    const findRefreshTokenByHashService = new FindRefreshTokenByHashService();
    const deleteRefreshTokenByHashService = new DeleteRefreshTokenService();
    const refreshTokenByHash = await findRefreshTokenByHashService.execute(
      refreshToken,
    );

    if (
      !refreshTokenByHash ||
      refreshTokenByHash.userId !== accessTokenPayload.sub
    )
      throw new AppError('Unauthorized');

    if (accessTokenPayload.exp) {
      const accessTokenExpirationTimeMore10Minutes = addMinutes(
        new Date(accessTokenPayload.exp * 1000),
        10,
      ).getTime();

      // Disallow generating a new token after 10 minutes of inactivity
      if (Date.now() > accessTokenExpirationTimeMore10Minutes) {
        await deleteRefreshTokenByHashService.execute(refreshToken);
        throw new AppError('Unauthorized', 401);
      }
    }

    request.user = {
      id: refreshTokenByHash.userId,
    };
    return next();
  } catch (error) {
    response.clearCookie('refresh-token');
    throw new AppError('Unauthorized', 401);
  }
}

export default isValidRefreshToken;
