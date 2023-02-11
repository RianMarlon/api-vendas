import AppError from '@shared/errors/app-error';

import DeleteRefreshTokenService from '@modules/token/services/delete-refresh-token-service';
import FindRefreshTokenByHashService from '@modules/token/services/find-refresh-token-by-hash-service';

interface IRequest {
  refreshToken: string;
}

class LogoutService {
  constructor(
    private findRefreshTokenByHashService: FindRefreshTokenByHashService,
    private deleteRefreshTokenService: DeleteRefreshTokenService,
  ) {}

  async execute({ refreshToken }: IRequest): Promise<void> {
    const refreshTokenByHash = await this.findRefreshTokenByHashService.execute(
      refreshToken,
    );

    if (!refreshTokenByHash) throw new AppError('Unathorized', 401);
    await this.deleteRefreshTokenService.execute(refreshToken);
  }
}

export default LogoutService;
