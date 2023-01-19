import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProductService from '../../../services/update-product-service';

class UpdateProductController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute(id, {
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }
}

export default UpdateProductController;
