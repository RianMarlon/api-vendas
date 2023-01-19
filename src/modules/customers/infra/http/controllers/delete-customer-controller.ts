import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteCustomerService from '../../../services/delete-customer-service';

class DeleteCustomerController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);
    await deleteCustomerService.execute(id);

    return response.status(204).json({});
  }
}

export default DeleteCustomerController;
