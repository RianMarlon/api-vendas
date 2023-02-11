import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';
import GenerateRefreshTokenService from '../generate-refresh-token-service';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';

let fakeRedisClient: FakeRedisClient;
let fakeUsersRepository: FakeUsersRepository;
let generateRefreshTokenService: GenerateRefreshTokenService;

describe('GenerateRefreshToken', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRedisClient = new FakeRedisClient();
    generateRefreshTokenService = new GenerateRefreshTokenService(
      fakeUsersRepository,
      fakeRedisClient,
    );
  });

  it('should generate a refresh token when the user exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'T3st!@4910',
    });

    expect(
      await generateRefreshTokenService.execute(user.id),
    ).not.toBeUndefined();
  });

  it('should throw an error when the user not exists', async () => {
    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'T3st!@4910',
    });

    await expect(generateRefreshTokenService.execute('teste')).rejects.toEqual({
      message: 'User not exists',
      statusCode: 404,
    });
  });
});
