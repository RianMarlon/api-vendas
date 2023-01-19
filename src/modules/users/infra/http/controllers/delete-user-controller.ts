import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteUserService from '../../../services/delete-user-service';

class DeleteUserController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserService = container.resolve(DeleteUserService);
    await deleteUserService.execute(id);

    return response.status(204).json({});
  }
}

export default DeleteUserController;
