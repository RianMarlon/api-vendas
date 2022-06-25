import { getRepository } from 'typeorm';

import User from '../entities/user';

class UsersRepository {
  private readonly repository = getRepository(User);

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async create(userToCreate: User): Promise<User> {
    const userCreated = this.repository.create(userToCreate);
    await this.repository.save(userCreated);

    return userCreated;
  }

  async update(id: string, userToUpdate: Partial<User>): Promise<User> {
    const userUpdated = this.repository.create({
      ...userToUpdate,
      id,
    });

    await this.repository.save(userUpdated);

    return userUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersRepository;