import { Request, Response } from 'express';

import ShowUserService from '../services/show-user-service';

class ShowUserController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = new ShowUserService();
    const user = await showUserService.execute(id);

    return response.status(200).json(user);
  }
}

export default ShowUserController;
