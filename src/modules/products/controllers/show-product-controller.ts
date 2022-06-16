import { Request, Response } from 'express';

import AppError from '@shared/errors/app-error';

import ShowProductService from '../services/show-product-service';

class ShowProductController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new AppError('ID não informado');
    }

    const showProductService = new ShowProductService();
    const product = await showProductService.execute(id);

    return response.status(200).json(product);
  }
}

export default ShowProductController;
