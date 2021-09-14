import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/http-exception';
import { ErrorHandling, ItemId, ListItems, ItemPostRequest } from '../models';
import { itemService } from '../services/item-service';

export const itemController = {
  async post(
    req: Request<ItemPostRequest>,
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
  async put(
    req: Request<ItemPostRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await itemService
      .buyItem(req.headers, req.body)
      .catch(error => {
        next(new HttpException(500, error.message));
      });

    if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  },
  async get(
    req: Request<unknown, unknown, unknown, ListItems>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await itemService.listItems(req.query).catch(error => {
      next(new HttpException(500, error.message));
    });

    if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  },
  async getById(
    req: Request<ItemId>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const itemId: ItemId = req.params;
    const data = await itemService.getItem(itemId).catch(error => {
      next(new HttpException(500, error.message));
    });

    if ((data as ErrorHandling).status === 'error') {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  },
};
