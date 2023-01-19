import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOrderService from '../../../services/show-order-service';

class ShowOrderController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = container.resolve(ShowOrderService);
    const order = await showOrderService.execute(id);

    return response.status(200).json(order);
  }
}

export default ShowOrderController;
