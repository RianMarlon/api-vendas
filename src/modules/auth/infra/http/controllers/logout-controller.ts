import { Request, Response } from 'express';

import LogoutService from '../../../services/logout-service';

class LogoutController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const logoutService = new LogoutService();
    await logoutService.execute({ refreshToken: request.refreshTokenHash });
    return response.status(204).json();
  }
}

export default LogoutController;
