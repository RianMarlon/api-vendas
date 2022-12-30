import { sign } from 'jsonwebtoken';

import auth from '@config/auth';

class GenerateAccessTokenService {
  execute(userId: string): string {
    const accessToken = sign(
      {
        sub: userId,
      },
      auth.accessTokenSecret,
      {
        audience: 'urn:jwt:type:access',
        issuer: 'urn:system:token-issuer:type:access',
        expiresIn: '15m',
      },
    );
    return accessToken;
  }
}

export default GenerateAccessTokenService;
