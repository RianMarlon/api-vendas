import { Request, Response } from 'express';

import DeleteCustomerService from '../../../services/delete-customer-service';

class DeleteCustomerController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();
    await deleteCustomerService.execute(id);

    return response.status(204).json({});
  }
}

export default DeleteCustomerController;
