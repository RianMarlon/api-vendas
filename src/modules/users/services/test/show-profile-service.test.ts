import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import ShowProfileService from '../show-profile-service';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should return profile data by user id', async () => {
    const userCreated = await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@4937842',
    });
    const userFounded = await showProfileService.execute(userCreated.id);

    expect(userFounded).toMatchObject(userCreated);
  });

  it('should throw an error when not exists an user with the id', async () => {
    await fakeUsersRepository.create({
      name: 'Rian Marlon',
      email: 'rianmarlon@gmail.com',
      password: 'Teste@4937842',
    });

    await expect(showProfileService.execute('teste')).rejects.toEqual({
      message: 'User not found',
      statusCode: 404,
    });
  });
});
