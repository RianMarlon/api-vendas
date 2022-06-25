import { Request, Response } from 'express';

import CreateUserService from '../services/create-user-service';

class CreateUserController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserController = new CreateUserService();
    const user = await createUserController.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export default CreateUserController;
