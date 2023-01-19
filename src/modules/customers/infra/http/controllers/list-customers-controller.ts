import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCustomersService from '../../../services/list-customers-service';

class ListCustomersController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;

    const listCustomersService = container.resolve(ListCustomersService);
    const customers = await listCustomersService.execute(
      Number(page),
      Number(limit),
    );

    return response.status(200).json(customers);
  }
}

export default ListCustomersController;
