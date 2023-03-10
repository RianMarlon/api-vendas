import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowProfileService from '../../../services/show-profile-service';

class ShowProfileController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfileService = container.resolve(ShowProfileService);
    const user = await showProfileService.execute(id);

    return response.status(200).json(instanceToInstance(user));
  }
}

export default ShowProfileController;
