import 'reflect-metadata';

import FakeHashProvider from '@shared/providers/hash/fakes/fake-hash-provider';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import CreateUserService from '../create-user-service';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@189',
    });

    expect(user).toMatchObject({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
    });
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  it('should throw an error when already exists a user with the same email', async () => {
    await createUserService.execute({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@189',
    });

    await expect(
      createUserService.execute({
        name: 'Rian Marlon',
        email: 'rianmarlon@gmail.com',
        password: 'Teste@189',
      }),
    ).rejects.toEqual({
      message: 'Email address already used',
      statusCode: 400,
    });
  });
});
