import 'reflect-metadata';

import FakeRedisClient from '@shared/redis-client/fakes/fake-redis-client';
import DeleteRefreshTokenService from '../delete-refresh-token-service';

let fakeRedisClient: FakeRedisClient;
let deleteRefreshTokenService: DeleteRefreshTokenService;

describe('DeleteRefreshToken', () => {
  beforeEach(() => {
    fakeRedisClient = new FakeRedisClient();
    deleteRefreshTokenService = new DeleteRefreshTokenService(fakeRedisClient);
  });

  it('shoud delete a refresh token existent', async () => {
    await fakeRedisClient.save('token:teste', 'teste');
    expect(await deleteRefreshTokenService.execute('teste')).toBeUndefined();
  });
});
