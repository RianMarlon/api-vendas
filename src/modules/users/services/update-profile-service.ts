import AppError from '@shared/errors/app-error';
import Hash from '@shared/utils/hash';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateProfileService {
  async execute(id: string, data: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const hash = new Hash();
    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found.');

    const newUser = {
      name: data.name || userById.name,
      email: data.email?.toLowerCase() || userById.email,
      password: userById.password,
    };

    if (data.email) {
      const userByEmail = await usersRepository.findByEmail(data.email);
      if (userByEmail && userById.id !== userByEmail.id)
        throw new AppError('There is already one user with this email.');
    }

    if (data.password && data.oldPassword) {
      const oldPasswordMatch = await hash.compare(
        data.oldPassword,
        userById.password,
      );

      if (!oldPasswordMatch) throw new AppError('Old password does not match');

      if (data.password) {
        const hash = new Hash();
        newUser.password = await hash.generate(data.password);
      }
    }

    const userUpdated = await usersRepository.update(id, newUser);

    return userUpdated;
  }
}

export default UpdateProfileService;
