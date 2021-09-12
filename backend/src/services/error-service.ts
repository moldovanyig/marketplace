import { ErrorHandling } from '../models/errorhandling';

export const createErrorPromise = (message: string): Promise<ErrorHandling> => {
  return new Promise(resolve => resolve({ status: 'error', message }));
};
