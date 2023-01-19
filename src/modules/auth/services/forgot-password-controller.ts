import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from './send-forgot-password-email-service';

class ForgotPasswordController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassowordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPassowordEmailService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
