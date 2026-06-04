import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { envConfig } from 'src/config/env.config';
@Injectable()
export class Token {
  getAccessToken(payload: object): string {
    const accessToken = jwt.sign(payload, envConfig.aToken.key, {
      expiresIn: '1d',
    });

    return accessToken;
  }
  getRefreshToken(res: Response, payload: object): string {
    const refreshToken = jwt.sign(payload, envConfig.rToken.key, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return refreshToken;
  }

  verifyAccessToken(aToken: string) {
    const isMatch = jwt.verify(aToken, envConfig.aToken.key);
    return isMatch;
  }
  verifyRefreshToken(rToken: string) {
    const isMatch = jwt.verify(rToken, envConfig.rToken.key);
    return isMatch;
  }
}
