import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { getClientIp } from 'request-ip';

import CreateSessionsService from '../services/create-sessions-service';

class CreateSessionsController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const ip = getClientIp(request);

    console.log(ip);

    const createSessionsService = new CreateSessionsService();
    const user = await createSessionsService.execute({
      email,
      password,
      ip,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default CreateSessionsController;
