import { SAVE_ITEM_INFO } from '../actions/itemAction';

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

export const itemReducer = (state = initialState, action: any) => {
  if (action.type === SAVE_ITEM_INFO) {
    return [...state, action.payload];
  }
  return state;
};
