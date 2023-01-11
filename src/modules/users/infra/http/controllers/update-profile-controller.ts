import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import UpdateProfileService from '../../../services/update-profile-service';

class UpdateProfileController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, oldPassword } = request.body;

    const updateProfileService = new UpdateProfileService();
    const user = await updateProfileService.execute(id, {
      name,
      email,
      password,
      oldPassword,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default UpdateProfileController;
