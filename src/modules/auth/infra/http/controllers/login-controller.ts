import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import LoginService from '../../../services/login-service';

class LoginController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);
    const { user, accessToken, refreshToken } = await loginService.execute({
      email,
      password,
    });

    return response
      .status(200)
      .json({ user: instanceToInstance(user), accessToken, refreshToken });
  }
}

export default LoginController;
