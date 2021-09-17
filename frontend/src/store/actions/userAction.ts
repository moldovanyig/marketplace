export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const saveUserInfo = (token: string) => ({
  type: SAVE_USER_INFO,
  payload: token,
});

export const deleteUserInfo = () => ({
  type: USER_LOGGED_OUT,
});
