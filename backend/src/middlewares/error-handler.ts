import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http-exception';
import logger from '../logger';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  logger.error(message);
  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
