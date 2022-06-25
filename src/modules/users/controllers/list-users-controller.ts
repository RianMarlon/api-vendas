import { Request, Response } from 'express';

import ListUsersService from '../services/list-users-service';

class ListUsersController {
  async handleRequest(request: Request, response: Response) {
    const listUsersService = new ListUsersService();
    const products = await listUsersService.execute();

    return response.status(200).json(products);
  }
}

export default ListUsersController;
