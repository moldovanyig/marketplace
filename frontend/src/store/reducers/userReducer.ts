import { SAVE_USER_INFO } from '../actions/userAction';

interface UserState {
  authorization: string;
  name: string;
}

const initialState: UserState = {
  authorization: '',
  name: '',
};

export const userReducer = (state = initialState, action: any) => {
  if (action.type === SAVE_USER_INFO) {
    return action.payload;
  }
  return state;
};
