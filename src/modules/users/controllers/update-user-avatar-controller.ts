import AppError from '@shared/errors/app-error';
import { Request, Response } from 'express';

import UpdateUserAvatarService from '../services/update-user-avatar-service';

class UpdateUserAvatarController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!request.file) {
      throw new AppError('Arquivo não informado');
    }

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute(id, {
      avatarFilename: request.file.filename,
    });

    return response.status(200).json(user);
  }
}

export default UpdateUserAvatarController;
