import { SAVE_USER_INFO } from '../actions/userAction';

interface UserState {
  authorization: string;
  name: string;
  avatar: number;
  money: number;
}

const initialState: UserState = {
  authorization: '',
  name: '',
  avatar: 0,
  money: 0,
};

export const userReducer = (state = initialState, action: any) => {
  if (action.type === SAVE_USER_INFO) {
    return action.payload;
  }
  return state;
};
