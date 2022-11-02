import { Request, Response } from 'express';

import ListCustomersService from '../services/list-customers-service';

class ListCustomersController {
  async handleRequest(request: Request, response: Response) {
    const listCustomersService = new ListCustomersService();
    const customers = await listCustomersService.execute();

    return response.status(200).json(customers);
  }
}

export default ListCustomersController;
