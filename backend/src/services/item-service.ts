import { db, pool } from '../data/connection';
import { DbResult } from '../models/data';
import {
  ErrorHandling,
  Item,
  ItemId,
  ListItems,
  ListResponse,
  ResponseItem,
  SaleRequest,
  SaleResponse,
  User,
} from '../models';
import { checkUrl } from './check-url-service';
import { checkPrice } from './check-price-service';
import { createErrorPromise } from './error-service';
import { sanitizeString } from './sanitize-service';
import { checkTitle } from './check-title-service';
import { checkDescription } from './check-description-service';

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
  } else if (!checkTitle(title)) {
    return createErrorPromise('Title length must be lower that 45 characters!');
  } else if (!checkDescription(description)) {
    return createErrorPromise(
      'Description length must be lower that 255 characters!'
    );
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

const buyItem = async (
  headers: User,
  request: Item
): Promise<SaleResponse | ErrorHandling> => {
  const { id } = headers;
  const { item_id } = request;
  const userData: DbResult = await db
    .query(`SELECT * FROM user WHERE id = ?`, [id])
    .catch(error => {
      throw new Error(`database error: ${error.message}`);
    });
  const name: string = (userData.results[0] as User).name;
  const money: number = (userData.results[0] as User).money;

  const sellerData: DbResult = await db
    .query(
      `SELECT user_id, price, sellable, money FROM item INNER JOIN user ON item.user_id = user.id WHERE item.id = ?`,
      [item_id]
    )
    .catch(error => {
      throw new Error(`database error: ${error.message}`);
    });

  const sellerId: number = (sellerData.results[0] as Item).user_id;
  const price: number = (sellerData.results[0] as Item).price;
  const sellable: number = (sellerData.results[0] as Item).sellable;
  const sellerMoney: number = (sellerData.results[0] as User).money;

  if (sellable === 0) return createErrorPromise('That is not for sale.');
  if (Number(id) === sellerId)
    return createErrorPromise('You can not buy your own item.');

  if (price <= money) {
    const poolPromise = (): Promise<SaleResponse> =>
      new Promise(async resolve => {
        pool.getConnection((error, connection) => {
          if (error) {
            throw new Error(`MySQL connection error: ${error.message}`);
          }

          connection.beginTransaction(error => {
            if (error) {
              throw new Error(`MySQL transaction error: ${error.message}`);
            }
            connection.query(
              `UPDATE user SET money = ${money - price} WHERE id = ?`,
              [id],
              (error, result) => {
                if (error) {
                  return connection.rollback(() => {
                    throw new Error(`database error: ${error.message}`);
                  });
                }
              }
            );
            connection.query(
              `UPDATE item SET sellable = 0, buyers_name = '${name}' WHERE id = ?`,
              [item_id],

              (error, result) => {
                if (error) {
                  return connection.rollback(() => {
                    throw new Error(`database error: ${error.message}`);
                  });
                }
              }
            );
            connection.query(
              `UPDATE user SET money = ${sellerMoney + price} WHERE id = ?`,
              [sellerId],
              (error, result) => {
                if (error) {
                  return connection.rollback(() => {
                    throw new Error(`database error: ${error.message}`);
                  });
                }
              }
            );
            connection.query(
              `UPDATE item SET sellable = 0 WHERE id = ?`,
              [item_id],
              (error, result) => {
                if (error) {
                  return connection.rollback(() => {
                    throw new Error(`database error: ${error.message}`);
                  });
                }
                connection.commit(error => {
                  if (error) {
                    return connection.rollback(() => {
                      throw new Error(`database error: ${error.message}`);
                    });
                  }
                  const response: SaleResponse = {
                    status: 'Buy was successful.',
                  };
                  return resolve(response);
                });
              }
            );
            connection.release();
          });
        });
      });
    return await poolPromise().catch(error => {
      throw new Error(`database error: ${error.message}`);
    });
  } else {
    return createErrorPromise('You do not have enough money.');
  }
};

const listItems = async (
  request: ListItems
): Promise<ListResponse[] | ErrorHandling> => {
  const { title, description, priceLowerThan, priceGreaterThan } = request;
  if (title) sanitizeString(title);
  if (title && !checkTitle(title))
    return createErrorPromise('Title length must be lower that 45 characters!');
  if (description) sanitizeString(description);
  if (description && !checkDescription(description))
    return createErrorPromise(
      'Description length must be lower that 255 characters!'
    );
  if (priceLowerThan && !checkPrice(Number(priceLowerThan)))
    return createErrorPromise('Price must be a postive integer!');
  if (priceGreaterThan && !checkPrice(Number(priceGreaterThan)))
    return createErrorPromise('Price must be a postive integer!');
  let sql: string = `SELECT title, photo_url, price FROM item WHERE sellable = 1 `;
  let values: Array<any> = [];
  if (title) {
    sql += `AND title = '${title}'`;
    values.push(title);
  }
  if (description) {
    sql += `AND description = '${description}' `;
    values.push(description);
  }
  if (priceLowerThan) {
    sql += `AND price < ${priceLowerThan} `;
    values.push(priceLowerThan);
  }
  if (priceGreaterThan) {
    sql += `AND price > ${priceGreaterThan} `;
    values.push(priceGreaterThan);
  }
  const list: DbResult = await db.query(sql, values).catch(error => {
    throw new Error(`database error: ${error.message}`);
  });

  if (list.results.length === 0) return createErrorPromise('No results');
  else return list.results as ListResponse[];
};

const getItem = async (
  request: ItemId
): Promise<ResponseItem | ErrorHandling> => {
  const id = Number(request.id);
  if (!checkPrice(id)) {
    return createErrorPromise('ID must be a postive integer!');
  }
  const data: DbResult = await db
    .query(
      `SELECT title, description, photo_url, price, buyers_name, name, avatar FROM item INNER JOIN user ON item.user_id = user.id WHERE item.id = ?`,
      [id]
    )
    .catch(error => {
      throw new Error(`database error: ${error.message}`);
    });
  if (data.results.length === 0)
    return createErrorPromise('There is no item with that ID.');
  else {
    return data.results[0] as ResponseItem;
  }
};

export const itemService = {
  postItem,
  buyItem,
  listItems,
  getItem,
};
