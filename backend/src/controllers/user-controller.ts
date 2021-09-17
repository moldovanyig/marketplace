import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/http-exception';
import { ErrorHandling, UserRequest } from '../models';
import { userService } from '../services/user-service';

export const userController = {
  async get(
    req: Request<UserRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.headers;
    const data = await userService.getUser({ name }).catch(error => {
      next(new HttpException(500, error.message));
    });
    if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  },
};
