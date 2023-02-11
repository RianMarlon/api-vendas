import 'reflect-metadata';

import FakeHashProvider from '@shared/providers/hash/fakes/fake-hash-provider';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import UpdateProfileService from '../update-profile-service';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should update an user existent', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });

    const userUpdated = await updateProfileService.execute(userCreated.id, {
      name: 'Rian Marlon 2',
      email: 'rianmarlon2@gmail.com',
      oldPassword: 'Teste@43983729',
      password: 'Teste32@4399',
    });

    expect(userUpdated).toMatchObject({
      id: userCreated.id,
      name: 'Rian Marlon 2',
      email: 'rianmarlon2@gmail.com',
      createdAt: userCreated.createdAt,
    });
  });

  it('should throw an error when not exists an user with id', async () => {
    await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });
    await expect(
      updateProfileService.execute('teste', {
        name: 'Rian Marlon',
      }),
    ).rejects.toEqual({
      message: 'User not found',
      statusCode: 400,
    });
  });

  it('should throw an error when already exists an user with the new email informed', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });
    await fakeUsersRepository.create({
      name: 'Rian Marlon2',
      email: 'rianmarlon2@gmail.com',
      password: 'Teste@43983729',
    });
    await expect(
      updateProfileService.execute(userCreated.id, {
        email: 'rianmarlon2@gmail.com',
      }),
    ).rejects.toEqual({
      message: 'There is already one user with this email',
      statusCode: 400,
    });
  });

  it('should throw an error when thw old password not match', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });
    await expect(
      updateProfileService.execute(userCreated.id, {
        oldPassword: 'Teste@4629',
        password: 'Teste@3729',
      }),
    ).rejects.toEqual({
      message: 'Old password does not match',
      statusCode: 400,
    });
  });
});
