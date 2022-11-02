import { Request, Response } from 'express';
import UpdateCustomerService from '../services/update-customer-service';

class UpdateCustomerController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomerService = new UpdateCustomerService();
    const customer = await updateCustomerService.execute(id, {
      name,
      email,
    });

    return response.status(200).json(customer);
  }
}

export default UpdateCustomerController;
