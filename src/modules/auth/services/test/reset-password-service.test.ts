import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import FakeUsersTokensRepository from '@modules/users/domain/repositories/fakes/fake-users-tokens-repository';
import FakeHashProvider from '@shared/providers/hash/fakes/fake-hash-provider';
import { subHours } from 'date-fns';
import 'reflect-metadata';
import ResetPasswordService from '../reset-password-service';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider,
    );
  });

  it('should reset a password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'T3st!@49823',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    expect(
      await resetPasswordService.execute({ token, password: 'T3st!@928' }),
    ).toBeUndefined();
  });

  it('should throw an error when token not exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'T3st!@49823',
    });

    await fakeUsersTokensRepository.generate(user.id);

    await expect(
      resetPasswordService.execute({
        token: 'teste',
        password: 'T3st!@928',
      }),
    ).rejects.toEqual({
      message: 'User token does not exists',
      statusCode: 404,
    });
  });

  it('should throw an error when user not exists', async () => {
    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'T3st!@49823',
    });

    const { token } = await fakeUsersTokensRepository.generate('teste');

    await expect(
      resetPasswordService.execute({
        token,
        password: 'T3st!@928',
      }),
    ).rejects.toEqual({
      message: 'User does not exists',
      statusCode: 404,
    });
  });

  it('should throw an error when date expirated', async () => {
    const { id: idUser } = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'T3st!@49823',
    });

    const { id, token } = await fakeUsersTokensRepository.generate(idUser);
    await fakeUsersTokensRepository.updateCreatedAt(
      id,
      subHours(new Date(), 3),
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: 'T3st!@928',
      }),
    ).rejects.toEqual({
      message: 'Token expired',
      statusCode: 401,
    });
  });
});
