import AppError from '@shared/errors/app-error';
import { Request, Response } from 'express';

import LogoutService from '../services/logout-service';

class LogoutController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const refreshToken = request.cookies['refresh-token'];

    if (!refreshToken) throw new AppError('Unathorized', 401);

    const logoutService = new LogoutService();
    await logoutService.execute({ refreshToken });

    response.clearCookie('refresh-token');
    return response.status(204).json();
  }
}

export default LogoutController;
