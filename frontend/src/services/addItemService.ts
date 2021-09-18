import config from '../config';
import { ItemRequest, ItemResponse } from '../interfaces/item';
import store from '../store';

const token: string = localStorage.getItem('token') || 'faketoken';
const name: string = store.getState().user['name'];

const addItemService = async (
  addItemData: ItemRequest
): Promise<ItemResponse> => {
  try {
    const response = await fetch(`${config.url}/api/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        name,
        authorization: token,
      },
      body: JSON.stringify(addItemData),
    });

    const result = await response.json();
    return result;
  } catch (err: any) {
    return err.message;
  }
};

export { addItemService };
