import { db } from '../data/connection';
import { DbResult } from '../models/data';
import { ErrorHandling, SaleRequest, SaleResponse, User } from '../models';
import { checkUrl } from './check-url-service';
import { checkPrice } from './check-price-service';
import { createErrorPromise } from './error-service';

const postItem = async (
  headers: User,
  request: SaleRequest
): Promise<SaleResponse | ErrorHandling> => {
  const { title, description, photo_url, price } = request;
  const { id } = headers;
  if (!title && !description && !photo_url && !price) {
    return createErrorPromise('All fields are required.');
  } else if (title && !description && !photo_url && !price) {
    return createErrorPromise(
      'Description, photo and price fields are required.'
    );
  } else if (description && !title && !photo_url && !price) {
    return createErrorPromise('Title, photo and price fields are required.');
  } else if (photo_url && !description && !title && !price) {
    return createErrorPromise(
      'Title, description and price fields are required.'
    );
  } else if (price && !description && !photo_url && !title) {
    return createErrorPromise(
      'Title, description and photo fields are required.'
    );
  } else if (title && description && !photo_url && !price) {
    return createErrorPromise('Photo and price fields are required.');
  } else if (title && photo_url && !description && !price) {
    return createErrorPromise('Description and price fields are required.');
  } else if (title && price && !description && !photo_url) {
    return createErrorPromise('Description and photo fields are required.');
  } else if (description && photo_url && !title && !price) {
    return createErrorPromise('Title and price fields are required.');
  } else if (description && price && !title && !photo_url) {
    return createErrorPromise('Title and photo fields are required.');
  } else if (photo_url && price && !title && !description) {
    return createErrorPromise('Title and description fields are required.');
  } else if (title && description && photo_url && !price) {
    return createErrorPromise('Price field is required.');
  } else if (title && description && price && !photo_url) {
    return createErrorPromise('Photo field is required.');
  } else if (title && photo_url && price && !description) {
    return createErrorPromise('Description field is required.');
  } else if (description && photo_url && price && !title) {
    return createErrorPromise('Title field is required.');
  } else if (!checkUrl(photo_url)) {
    return createErrorPromise('Photo field must be a valid image url!');
  } else if (!checkPrice(price)) {
    return createErrorPromise('Price must be a postive integer!');
  } else {
    //checking if title is still available
    const data: DbResult = await db
      .query(`SELECT * FROM item WHERE title = ?`, [title])
      .catch(error => {
        throw new Error(`database error: ${error.message}`);
      });

    if (data.results.length > 0) {
      return createErrorPromise('Title is already taken.');
    } else {
      return new Promise(async resolve => {
        const addItem = await db
          .query(
            `INSERT INTO item (title, description, photo_url, price, user_id) VALUES (?, ?, ?, ?, ?)`,
            [title, description, photo_url, price, id]
          )
          .catch(error => {
            throw new Error(`database error: ${error.message}`);
          });
        if (addItem) {
          const response: SaleResponse = { status: 'ok' };
          resolve(response);
        }
      });
    }
  }
};

export const itemService = {
  postItem,
};
