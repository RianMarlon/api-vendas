import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateSessionsService from '../services/create-sessions-service';

class CreateSessionsController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();
    const user = await createSessionsService.execute({
      email,
      password,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default CreateSessionsController;
