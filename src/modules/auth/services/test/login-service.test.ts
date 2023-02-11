import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import FakeHashProvider from '@shared/providers/hash/fakes/fake-hash-provider';
import GenerateAccessTokenService from '@modules/token/services/generate-access-token-service';
import GenerateRefreshTokenService from '@modules/token/services/generate-refresh-token-service';
import LoginService from '../login-service';
import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';

let fakeRedisClient: FakeRedisClient;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let generateAccessTokenService: GenerateAccessTokenService;
let generateRefreshTokenService: GenerateRefreshTokenService;
let loginService: LoginService;

describe('LoginService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    generateAccessTokenService = new GenerateAccessTokenService();
    generateRefreshTokenService = new GenerateRefreshTokenService(
      fakeUsersRepository,
      fakeRedisClient,
    );
    loginService = new LoginService(
      fakeUsersRepository,
      fakeHashProvider,
      generateAccessTokenService,
      generateRefreshTokenService,
    );
  });

  it('should login with data of user create', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: 'T3st!@04923',
    });

    const loginData = await loginService.execute({
      email: 'teste@teste.com',
      password: 'T3st!@04923',
    });

    expect(loginData).toHaveProperty('user');
    expect(loginData).toHaveProperty('accessToken');
    expect(loginData).toHaveProperty('refreshToken');
  });

  it('should throw an error when not exists an user with the email', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: 'T3st!@04923',
    });

    expect(
      loginService.execute({
        email: 'teste@gmail.com',
        password: 'T3st!@04923',
      }),
    ).rejects.toEqual({
      message: 'The email address or password is incorrect',
      statusCode: 401,
    });
  });

  it('should throw an error when not exists an user with the password', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: 'T3st!@04923',
    });

    expect(
      loginService.execute({
        email: 'teste@teste.com',
        password: 'T3st!@4325',
      }),
    ).rejects.toEqual({
      message: 'The email address or password is incorrect',
      statusCode: 401,
    });
  });
});
