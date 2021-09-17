import { db } from '../data/connection';
import { DbResult, ErrorHandling, UserRequest, UserResponse } from '../models';
import { createErrorPromise } from './error-service';

const getUser = async (
  request: UserRequest
): Promise<UserResponse | ErrorHandling> => {
  const { name } = request;
  if (!name) return createErrorPromise('Name is required.');
  const data = await db
    .query(`SELECT avatar, money FROM user WHERE name = ?;`, [name])
    .catch(error => {
      throw new Error(error.message);
    });

  const result = ((data as DbResult).results as UserResponse[])[0];

  if (!result) return createErrorPromise('Name does not exists.');
  else return result;
};

export const userService = {
  getUser,
};
