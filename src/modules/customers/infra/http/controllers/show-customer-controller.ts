import { Request, Response } from 'express';

import ShowCustomerService from '../../../services/show-customer-service';

class ShowCustomerController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = new ShowCustomerService();
    const customer = await showCustomerService.execute(id);

    return response.status(200).json(customer);
  }
}

export default ShowCustomerController;
