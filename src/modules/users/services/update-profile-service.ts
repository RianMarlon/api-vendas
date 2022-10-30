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
  async execute(id: string, data: IRequest) {
    const usersRepository = new UsersRepository();
    const hash = new Hash();
    const userById = await usersRepository.findById(id);

    if (!userById) throw new AppError('User not found.');

    const userByEmail = await usersRepository.findByEmail(data.email);
    if (userByEmail && userById.id !== userByEmail.id)
      throw new AppError('There is already one user with this email.');

    const newUser = {
      ...userById,
      ...data,
    };

    const userToUpdate = new User();
    userToUpdate.id = id;
    userToUpdate.name = newUser.name;
    userToUpdate.email = newUser.email.toLowerCase();

    if (data.password && data.oldPassword) {
      const oldPasswordMatch = await hash.compare(
        userById.password,
        data.oldPassword,
      );

      if (!oldPasswordMatch) throw new AppError('Old password does not match');

      if (data.password) {
        const hash = new Hash();
        userToUpdate.password = await hash.generate(data.password);
      }
    }

    const userUpdated = await usersRepository.update(id, userToUpdate);

    return userUpdated;
  }
}

export default UpdateProfileService;
