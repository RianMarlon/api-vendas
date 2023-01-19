import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ListUsersService from '../../../services/list-users-service';

class ListUsersController {
  async handleRequest(request: Request, response: Response) {
    const { page, limit } = request.query;

    const listUsersService = container.resolve(ListUsersService);
    const users = await listUsersService.execute(Number(page), Number(limit));

    return response.status(200).json(instanceToInstance(users));
  }
}

export default ListUsersController;
