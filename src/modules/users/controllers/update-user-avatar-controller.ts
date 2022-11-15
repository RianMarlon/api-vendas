import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import AppError from '@shared/errors/app-error';

import UpdateUserAvatarService from '../services/update-user-avatar-service';

class UpdateUserAvatarController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    if (!request.file) {
      throw new AppError('Arquivo não informado');
    }

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute(id, {
      avatarFilename: request.file.filename,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default UpdateUserAvatarController;
