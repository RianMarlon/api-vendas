import AppError from '@shared/errors/app-error';
import UsersRepository from '../typeorm/repositories/users-repository';

class ShowProfileService {
  async execute(id: string) {
    const usersRepository = new UsersRepository();
    const userById = usersRepository.findById(id);

    if (!userById) throw new AppError('User not found');

    return userById;
  }
}

export default ShowProfileService;
