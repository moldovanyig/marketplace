import config from '../config';
import { ItemResponse } from '../interfaces/item';
import store from '../store';

const token: string = localStorage.getItem('token') || 'faketoken';
const name: string = store.getState().user['name'];

const buyItemService = async (title: string): Promise<ItemResponse> => {
  try {
    const response = await fetch(`${config.url}/api/item`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        name,
        authorization: token,
      },
      body: JSON.stringify(title),
    });

    const result = await response.json();
    return result;
  } catch (err: any) {
    return err.message;
  }
};

export { buyItemService };
