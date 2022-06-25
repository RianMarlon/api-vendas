import { Request, Response } from 'express';

import UpdateUserService from '../services/update-user-service';

class UpdateUserController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute(id, { name, email, password });

    return response.status(200).json(user);
  }
}
