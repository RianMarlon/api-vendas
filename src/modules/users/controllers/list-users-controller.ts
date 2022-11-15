import { Request, Response } from 'express';

import ListUsersService from '../services/list-users-service';

class ListUsersController {
  async handleRequest(request: Request, response: Response) {
    const { page, limit } = request.query;

    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute(Number(page), Number(limit));

    return response.status(200).json(users);
  }
}

export default ListUsersController;
