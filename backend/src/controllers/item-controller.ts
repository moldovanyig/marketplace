import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/http-exception';
import { ErrorHandling, SaleRequest } from '../models';
import { itemService } from '../services/item-service';

export const itemController = {
  async post(
    req: Request<SaleRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await itemService
      .postItem(req.headers, req.body)
      .catch(error => {
        next(new HttpException(500, error.message));
      });

    if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(201).json(data);
    }
  },
};
