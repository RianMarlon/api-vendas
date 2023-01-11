import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateUserService from '../../../services/create-user-service';

class CreateUserController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }
}

export default CreateUserController;
