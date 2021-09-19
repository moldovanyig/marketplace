import { ItemState } from '../reducers/itemReducer';

export const SAVE_ITEM_INFO = 'SAVE_ITEM_INFO';

export const saveItemInfo = (data: Array<ItemState>) => ({
  type: SAVE_ITEM_INFO,
  payload: data,
});
