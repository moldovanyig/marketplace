import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/http-exception';
import { ErrorHandling, RegistrationRequest } from '../models';
import { registrationService } from '../services/registration-service';

export const registrationController = {
  async post(
    req: Request<RegistrationRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await registrationService
      .postRegistration(req.body)
      .catch(error => {
        next(new HttpException(500, error.message));
      });

    if ((data as ErrorHandling).message === 'Username is already taken.') {
      res.status(409).json(data);
    } else if (
      (data as ErrorHandling).message ===
      'Password must be at least 8 characters.'
    ) {
      res.status(406).json(data);
    } else if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(201).json(data);
    }
  },
};
