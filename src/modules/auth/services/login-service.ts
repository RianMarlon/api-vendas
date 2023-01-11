import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import User from '@modules/users/infra/typeorm/entities/user';

import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';

import GenerateRefreshTokenService from '@modules/token/services/generate-refresh-token-service';
import GenerateAccessTokenService from '@modules/token/services/generate-access-token-service';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

class LoginService {
  async execute(data: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository();
    const generateAccessTokenService = new GenerateAccessTokenService();
    const generateRefreshTokenService = new GenerateRefreshTokenService();
    const user = await usersRepository.findByEmail(data.email);

    if (!user)
      throw new AppError('The email address or password is incorrect', 401);

    const hash = new Hash();
    const matchPassword = await hash.compare(data.password, user.password);

    if (!matchPassword)
      throw new AppError('The email address or password is incorrect', 401);

    const accessToken = generateAccessTokenService.execute(user.id);
    const refreshToken = await generateRefreshTokenService.execute(user.id);

    return { user, accessToken, refreshToken };
  }
}

export default LoginService;
