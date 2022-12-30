import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { addDays } from 'date-fns';

import LoginService from '../services/login-service';

class LoginController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginService = new LoginService();
    const { user, accessToken, refreshToken } = await loginService.execute({
      email,
      password,
    });

    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: addDays(Date.now(), 7),
    });

    return response
      .status(200)
      .json({ user: instanceToInstance(user), accessToken });
  }
}

export default LoginController;
