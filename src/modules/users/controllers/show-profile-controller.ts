import { Request, Response } from 'express';

import ShowProfileService from '../services/show-profile-service';

class ShowProfileController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfileService = new ShowProfileService();
    const user = await showProfileService.execute(id);

    return response.status(200).json(user);
  }
}

export default ShowProfileController;
