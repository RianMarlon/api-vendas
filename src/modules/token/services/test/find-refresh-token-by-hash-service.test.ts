import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';
import FindRefreshTokenByHashService from '../find-refresh-token-by-hash-service';

let fakeRedisClient: FakeRedisClient;
let findRefreshTokenByHashService: FindRefreshTokenByHashService;

describe('FindRefreshTokenByHashService', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    findRefreshTokenByHashService = new FindRefreshTokenByHashService(
      fakeRedisClient,
    );
  });

  it('should return the refresh token when exists', async () => {
    await fakeRedisClient.save('token:teste', 'teste');
    expect(
      await findRefreshTokenByHashService.execute('teste'),
    ).not.toBeUndefined();
  });
});
