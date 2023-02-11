import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import ListUsersService from '../list-users-service';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;

describe('ListUsersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('shoud return the first 5 users', async () => {
    // create some users
    for (let i = 0; i < 10; i++) {
      await fakeUsersRepository.create({
        name: `Rian Marlon ${i}`,
        email: `rianmarlon${i}@gmail.com`,
        password: 'Teste@934782',
      });
    }

    const result = await listUsersService.execute(1, 5);

    expect(result.items.length).toEqual(5);
    expect(result.metadata.currentPage).toEqual(1);
    expect(result.metadata.totalItems).toEqual(10);
    expect(result.metadata.itemsPerPage).toEqual(5);
    expect(result.metadata.totalPages).toEqual(2);
  });
});
