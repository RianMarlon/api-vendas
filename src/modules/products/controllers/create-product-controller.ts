import { Request, Response } from 'express';

import CreateProductService from '../services/create-product-service';

class CreateProductController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.status(201).json(product);
  }
}

export default CreateProductController;
