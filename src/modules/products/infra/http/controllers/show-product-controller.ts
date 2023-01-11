import { Request, Response } from 'express';

import ShowProductService from '../../../services/show-product-service';

class ShowProductController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductService = new ShowProductService();
    const product = await showProductService.execute(id);

    return response.status(200).json(product);
  }
}

export default ShowProductController;
