import { sign } from 'jsonwebtoken';
import { createHmac } from 'crypto';
import { injectable, inject } from 'tsyringe';

import auth from '@config/auth';
import AppError from '@shared/errors/app-error';
import { IRedisClient } from '@shared/redis-client/models/redis-client.interface';

import { IUsersRepository } from '@modules/users/domain/repositories/users-repository.interface';

@injectable()
class GenerateRefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RedisClient')
    private redisClient: IRedisClient,
  ) {}

  async execute(userId: string): Promise<string> {
    const userById = await this.usersRepository.findById(userId);
    if (!userById) throw new AppError('User not exists', 404);

    const refreshToken = sign(
      {
        sub: userId,
      },
      auth.refreshTokenSecret,
      {
        audience: 'urn:jwt:type:refresh',
        issuer: 'urn:system:token-issuer:type:refresh',
        expiresIn: `${auth.refreshTokenDurationMinutes}m`,
      },
    );

    const refreshTokenHash = createHmac('sha512', auth.refreshTokenSecret)
      .update(refreshToken)
      .digest('hex');

    await this.redisClient.save(
      `token:${refreshTokenHash}`,
      {
        userId: userById.id,
      },
      auth.refreshTokenDurationMinutes * 60,
    );

    return refreshToken;
  }
}

export default GenerateRefreshTokenService;
