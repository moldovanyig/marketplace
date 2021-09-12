import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/http-exception';
import { LoginRequest } from '../models/login';
import { loginService } from '../services/login-service';

export const loginController = {
  async post(
    req: Request<LoginRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, password } = req.body;
    const data = await loginService
      .postLogin({ name, password })
      .catch(error => {
        next(new HttpException(500, error));
      });
    if (data) {
      let code: number;
      if (
        data.status === 'error' &&
        data.message === 'Username or password is incorrect.'
      ) {
        code = 401;
      } else if (data.status === 'error') {
        code = 400;
      } else {
        code = 200;
      }
      res.status(code).json(data);
    }
  },
};
