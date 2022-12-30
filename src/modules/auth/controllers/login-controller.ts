import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { getClientIp } from 'request-ip';

import LoginService from '../services/login-service';

class LoginController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const ip = getClientIp(request);

    const loginService = new LoginService();
    const user = await loginService.execute({
      email,
      password,
      ip,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default LoginController;
