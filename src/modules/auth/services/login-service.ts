import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/app-error';

import { IHashProvider } from '@shared/providers/hash/models/hash-provider.interface';

import { IUsersRepository } from '@modules/users/domain/repositories/users-repository.interface';
import { IUser } from '@modules/users/domain/models/user.interface';

import GenerateRefreshTokenService from '@modules/token/services/generate-refresh-token-service';
import GenerateAccessTokenService from '@modules/token/services/generate-access-token-service';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

@injectable()
class LoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const generateAccessTokenService = new GenerateAccessTokenService();
    const generateRefreshTokenService = new GenerateRefreshTokenService();
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user)
      throw new AppError('The email address or password is incorrect', 401);

    const matchPassword = await this.hashProvider.compare(
      data.password,
      user.password,
    );

    if (!matchPassword)
      throw new AppError('The email address or password is incorrect', 401);

    const accessToken = generateAccessTokenService.execute(user.id);
    const refreshToken = await generateRefreshTokenService.execute(user.id);

    return { user, accessToken, refreshToken };
  }
}

export default LoginService;
