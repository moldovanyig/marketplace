import { NextFunction } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

import HttpException from '../exceptions/http-exception';

function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new HttpException(401, 'Unauthorized'));
  }

  const secret = config.tokenSecrets.access as jwt.Secret;
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return next(new HttpException(403, 'Invalid token'));
    }

    next();
  });
}

export default authenticateToken;
