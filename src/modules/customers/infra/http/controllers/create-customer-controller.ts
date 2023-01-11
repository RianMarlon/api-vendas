import { Request, Response } from 'express';

import CreateCustomerService from '../../../services/create-customer-service';

class CreateCustomerController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = new CreateCustomerService();
    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.status(201).json(customer);
  }
}

export default CreateCustomerController;
