import { Request, Response } from 'express';

import UpdateProductService from '../../../services/update-product-service';

class UpdateProductController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute(id, {
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }
}

export default UpdateProductController;
