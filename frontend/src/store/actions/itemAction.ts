import { ItemState } from '../reducers/itemReducer';

export const SAVE_ITEM_INFO = 'SAVE_ITEM_INFO';
export const SAVE_ITEM_LIST_INFO = 'SAVE_ITEM_LIST_INFO';

export const saveListInfo = (data: Array<ItemState>) => ({
  type: SAVE_ITEM_LIST_INFO,
  payload: data,
});

export const saveItemInfo = (data: ItemState) => ({
  type: SAVE_ITEM_INFO,
  payload: data,
});
