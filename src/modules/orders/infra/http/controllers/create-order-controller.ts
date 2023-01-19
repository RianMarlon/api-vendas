import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '../../../services/create-order-service';

class CreateOrderController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;

    const createOrderService = container.resolve(CreateOrderService);
    const order = await createOrderService.execute({
      customerId,
      products,
    });

    return response.status(201).json(order);
  }
}

export default CreateOrderController;
