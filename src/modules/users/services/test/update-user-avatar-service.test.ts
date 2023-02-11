import 'reflect-metadata';

import FakeStorageProvider from '@shared/providers/storage/fakes/fake-storage-provider';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';

import UpdateUserAvatarService from '../update-user-avatar-service';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should update an user avatar', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });

    const userUpdated = await updateUserAvatarService.execute(userCreated.id, {
      avatarFilename: 'teste.png',
    });

    expect(userUpdated).toMatchObject({
      id: userCreated.id,
      avatar: 'teste.png',
    });
  });

  it('should delete the user avatar when update', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });

    await updateUserAvatarService.execute(userCreated.id, {
      avatarFilename: 'teste.png',
    });

    const userUpdated = await updateUserAvatarService.execute(userCreated.id, {
      avatarFilename: 'teste2.png',
    });

    expect(userUpdated).toMatchObject({
      id: userCreated.id,
      avatar: 'teste2.png',
    });
  });

  it('should throw an error when not exists an user with the id', async () => {
    await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@43983729',
    });

    await expect(
      updateUserAvatarService.execute('teste', {
        avatarFilename: 'teste.png',
      }),
    ).rejects.toEqual({
      message: 'User not found',
      statusCode: 404,
    });
  });
});
