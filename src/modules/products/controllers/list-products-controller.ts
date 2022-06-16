import { Request, Response } from 'express';

import ListProductsService from '../services/list-products-service';

class ListProductsController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute();

    return response.status(200).json(products);
  }
}

export default ListProductsController;
