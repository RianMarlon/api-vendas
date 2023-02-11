import 'reflect-metadata';

import GenerateAccessTokenService from '../generate-access-token-service';

let generateAccessTokenService: GenerateAccessTokenService;

describe('GenerateAccessTokenService', () => {
  beforeEach(() => {
    generateAccessTokenService = new GenerateAccessTokenService();
  });

  it('should generate an acess token', () => {
    expect(generateAccessTokenService.execute('teste')).not.toBeUndefined();
  });
});
