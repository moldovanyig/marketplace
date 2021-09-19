import { RootStateOrAny } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';

import { userReducer } from './reducers/userReducer';
import { itemReducer } from './reducers/itemReducer';

const appReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
});

const rootReducer = (state: RootStateOrAny | undefined, action: AnyAction) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
