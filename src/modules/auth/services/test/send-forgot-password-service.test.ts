import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/fake-users-repository';
import FakeUsersTokensRepository from '@modules/users/domain/repositories/fakes/fake-users-tokens-repository';
import FakeMailProvider from '@shared/providers/mail/fakes/fake-mail-provider';
import SendForgotPasswordEmailService from '../send-forgot-password-email-service';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should send an email to user', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: 'T3st!@3928',
    });

    expect(
      await sendForgotPasswordEmailService.execute({
        email: 'teste@teste.com',
      }),
    ).toBeUndefined();
  });

  it('should throw an error when not exists an user with the email informed', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: 'T3st!@3928',
    });

    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'teste2@teste.com',
      }),
    ).rejects.toEqual({
      message: 'User does not exists',
      statusCode: 404,
    });
  });
});
