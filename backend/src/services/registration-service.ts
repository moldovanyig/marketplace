import bcrypt from 'bcrypt';

import { db } from '../data/connection';
import { DbResult } from '../models/data';
import {
  ErrorHandling,
  RegistrationRequest,
  RegistrationResponse,
} from '../models';
import { checkPassword } from './check-password-service';
import { createErrorPromise } from './error-service';

const postRegistration = async (
  request: RegistrationRequest
): Promise<RegistrationResponse | ErrorHandling> => {
  const { name, password, avatar } = request;

  //Errors: input is not correct or empty
  if (!name && !password && !avatar) {
    return createErrorPromise('Name, password and avatar are required.');
  } else if (password && !name && !avatar) {
    return createErrorPromise('Name and avatar are required.');
  } else if (name && !password && !avatar) {
    return createErrorPromise('Password and avatar are required.');
  } else if (avatar && !password && !name) {
    return createErrorPromise('Name and password are required.');
  } else if (avatar && password && !name) {
    return createErrorPromise('Name is required.');
  } else if (avatar && name && !password) {
    return createErrorPromise('Password is required.');
  } else if (name && password && !avatar) {
    return createErrorPromise('Avatar is required.');
  } else if (!checkPassword(password)) {
    return createErrorPromise('Password must be at least 8 characters.');
  } else {
    //checking if username is still available
    const data: DbResult = await db
      .query(`SELECT * FROM user WHERE name = ?`, [name])
      .catch(error => {
        throw new Error(`database error: ${error.message}`);
      });

    if (data.results.length > 0) {
      return createErrorPromise('Name is already taken.');
    } else {
      //posting data to db
      return new Promise(async resolve => {
        const saltRounds = await bcrypt.genSalt();

        const hashPromise = () =>
          new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                reject(err);
              } else {
                resolve(hash);
              }
            });
          });

        const hash = await hashPromise().catch(() => {
          throw new Error('hashing is not working');
        });

        const addUser = await db
          .query(`INSERT INTO user (name, password, avatar) VALUES (?, ?, ?)`, [
            name,
            hash,
            avatar,
          ])
          .catch(error => {
            throw new Error(`database error: ${error.message}`);
          });

        if (addUser) {
          const getData = await db
            .query(`SELECT id, name, avatar FROM user WHERE name = ?`, [name])
            .catch(error => {
              throw new Error(`database error: ${error.message}`);
            });

          const response: RegistrationResponse = getData
            .results[0] as RegistrationResponse;

          resolve(response);
        }
      });
    }
  }
};

export const registrationService = {
  postRegistration,
};
