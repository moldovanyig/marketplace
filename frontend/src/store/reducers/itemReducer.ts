import { SAVE_ITEM_INFO, SAVE_ITEM_LIST_INFO } from '../actions/itemAction';

export interface ItemState {
  title: string;
  avatar?: number;
  buyers_name?: string | null;
  description?: string;
  name?: string;
  photo_url: string;
  price: number;
}

const initialState: Array<ItemState> = [];

const initialStateForId: ItemState = {
  title: '',
  avatar: 0,
  buyers_name: '',
  description: '',
  name: '',
  photo_url: '',
  price: 0,
};

export const itemListReducer = (state = initialState, action: any) => {
  if (action.type === SAVE_ITEM_LIST_INFO) {
    return action.payload;
  }
  return state;
};

export const itemReducer = (state = initialStateForId, action: any) => {
  if (action.type === SAVE_ITEM_INFO) {
    return action.payload;
  }
  return state;
};
