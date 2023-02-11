import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import DeleteUserService from '../delete-user-service';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('should return profile data by user id', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@4937842',
    });
    expect(await deleteUserService.execute(userCreated.id)).toBeUndefined();
  });

  it('should throw an error when not exists an user with the id', async () => {
    await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@4937842',
    });

    await expect(deleteUserService.execute('teste')).rejects.toEqual({
      message: 'User not found',
      statusCode: 404,
    });
  });
});
