import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/send-forgot-password-email-service';

class ForgotPasswordController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassowordEmailService =
      new SendForgotPasswordEmailService();

    await sendForgotPassowordEmailService.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
