import { Request, Response } from 'express';
import GenerateAccessTokenService from '../services/generate-access-token-service';

class GenerateAccessTokenController {
  async handleRequest(request: Request, response: Response): Promise<Response> {
    const user = request.user;

    const generateAccessTokenService = new GenerateAccessTokenService();
    const accessToken = generateAccessTokenService.execute(user.id);

    return response.status(201).json({ accessToken });
  }
}

export default GenerateAccessTokenController;
