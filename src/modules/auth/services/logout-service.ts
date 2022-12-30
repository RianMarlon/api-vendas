import AppError from '@shared/errors/app-error';

import DeleteRefreshTokenService from '@modules/token/services/delete-refresh-token-service';
import FindRefreshTokenByHashService from '@modules/token/services/find-refresh-token-by-hash';

interface IRequest {
  refreshToken: string;
}

class LogoutService {
  async execute({ refreshToken }: IRequest): Promise<void> {
    const findRefreshTokenByHashService = new FindRefreshTokenByHashService();
    const deleteRefreshTokenService = new DeleteRefreshTokenService();
    const refreshTokenByHash = await findRefreshTokenByHashService.execute(
      refreshToken,
    );

    if (!refreshTokenByHash) throw new AppError('Unathorized', 401);
    await deleteRefreshTokenService.execute(rrefreshToken);
  }
}

export default LogoutService;
