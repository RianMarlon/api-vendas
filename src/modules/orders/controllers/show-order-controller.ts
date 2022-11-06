import { Request, Response } from 'express';

import ShowOrderService from '../services/show-order-service';

class ShowOrderController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = new ShowOrderService();
    const order = await showOrderService.execute(id);

    return response.status(200).json(order);
  }
}

export default ShowOrderController;
