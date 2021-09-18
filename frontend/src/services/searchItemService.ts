import config from '../config';
import { ItemListResponse } from '../interfaces/item';

const token: string = localStorage.getItem('token') || 'faketoken';

const searchListService = async (
  listData: string
): Promise<ItemListResponse> => {
  try {
    const response = await fetch(`${config.url}/api/item?${listData}`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });

    const result = await response.json();
    return result;
  } catch (err: any) {
    return err.message;
  }
};

const searchIdService = async (id: number): Promise<ItemListResponse> => {
  try {
    const response = await fetch(`${config.url}/api/item/${id}`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });

    const result = await response.json();
    return result;
  } catch (err: any) {
    return err.message;
  }
};

export { searchListService, searchIdService };
