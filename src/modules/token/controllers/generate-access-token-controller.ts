import { Request, Response } from 'express';

import GenerateAccessTokenService from '../services/generate-access-token-service';
import GenerateRefreshTokenService from '../services/generate-refresh-token-service';
import DeleteRefreshTokenService from '../services/delete-refresh-token-service';

class GenerateAccessTokenController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const user = request.user;

    const generateAccessTokenService = new GenerateAccessTokenService();
    const generateRefreshTokenService = new GenerateRefreshTokenService();
    const deleteRefreshTokenService = new DeleteRefreshTokenService();

    await deleteRefreshTokenService.execute(request.refreshTokenHash);
    const accessToken = generateAccessTokenService.execute(user.id);
    const refreshToken = await generateRefreshTokenService.execute(user.id);

    return response.status(201).json({ accessToken, refreshToken });
  }
}

export default GenerateAccessTokenController;
