import { db } from '../data/connection';
import { LoginResponse, DbResult, LoginRequest } from '../models';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const postLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const { name, password } = request;
  const data = await db
    .query(`SELECT name, password FROM user WHERE name = ?;`, [name])
    .catch(error => {
      throw new Error(error.message);
    });

  const result = ((data as DbResult).results as LoginRequest[])[0];

  return new Promise((resolve, reject) => {
    if (!result) {
      resolve({
        status: 'error',
        message: 'That user is not exists.',
      });
    } else if (!name && !password) {
      resolve({
        status: 'error',
        message: 'Name and password are required.',
      });
    } else if (name && !password) {
      resolve({ status: 'error', message: 'Password is required.' });
    } else if (!name && password) {
      resolve({ status: 'error', message: 'Name is required.' });
    } else {
      if (result) {
        bcrypt.compare(password, result.password, (err, bcryptResult) => {
          if (err) {
            reject(new Error(err.message));
          }
          if (bcryptResult) {
            const user = { name };
            const secret = config.tokenSecrets.access as jwt.Secret;
            const accessToken = jwt.sign(user, secret);
            resolve({ status: 'ok', token: accessToken });
          } else {
            resolve({
              status: 'error',
              message: 'Name or password is incorrect.',
            });
          }
        });
      } else {
        resolve({
          status: 'error',
          message: 'Name or password is incorrect.',
        });
      }
    }
  });
};

export const loginService = {
  postLogin,
};
