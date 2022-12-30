import { sign } from 'jsonwebtoken';

import auth from '@config/auth';

import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';

import User from '@modules/users/typeorm/entities/user';

import UsersRepository from '@modules/users/typeorm/repositories/users-repository';

interface IRequest {
  email: string;
  password: string;
  ip: string | null;
}

interface IResponse {
  user: User;
  token: string;
}

class LoginService {
  async execute(data: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByEmail(data.email);

    if (!user)
      throw new AppError('The email address or password is incorrect', 401);

    const hash = new Hash();
    const matchPassword = await hash.compare(data.password, user.password);

    if (!matchPassword)
      throw new AppError('The email address or password is incorrect', 401);

    const token = sign(
      {
        id: user.id,
        clientIp: data.ip,
      },
      auth.jwt.secret,
      {
        expiresIn: auth.jwt.expiresIn,
      },
    );

    return { user, token };
  }
}

export default LoginService;
