import { Request, Response } from 'express';

import AppError from '@shared/errors/app-error';

import DeleteProductService from '../services/delete-product-service';

class DeleteProductController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new AppError('ID não informado');
    }

    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute(id);

    return response.status(204).json({});
  }
}

export default DeleteProductController;
