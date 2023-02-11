import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';

import FindRefreshTokenByHashService from '@modules/token/services/find-refresh-token-by-hash-service';
import DeleteRefreshTokenService from '@modules/token/services/delete-refresh-token-service';
import LogoutService from '../logout-service';

let fakeRedisClient: FakeRedisClient;
let findRefreshTokenByHashService: FindRefreshTokenByHashService;
let deleteRefreshTokenService: DeleteRefreshTokenService;
let logoutService: LogoutService;

describe('LogoutService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    findRefreshTokenByHashService = new FindRefreshTokenByHashService(
      fakeRedisClient,
    );
    deleteRefreshTokenService = new DeleteRefreshTokenService(fakeRedisClient);
    logoutService = new LogoutService(
      findRefreshTokenByHashService,
      deleteRefreshTokenService,
    );
  });

  it('should logout', async () => {
    await fakeRedisClient.save('token:teste', 'teste');
    expect(
      await logoutService.execute({ refreshToken: 'teste' }),
    ).toBeUndefined();
  });

  it('should an throw logout', async () => {
    await fakeRedisClient.save('token:teste2', 'teste');
    await expect(
      logoutService.execute({ refreshToken: 'teste3' }),
    ).rejects.toEqual({
      message: 'Unathorized',
      statusCode: 401,
    });
  });
});
