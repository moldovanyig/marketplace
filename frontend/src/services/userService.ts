import { UserRequest, UserResponse } from '../interfaces/user';

import config from '../config';

const userService = async (userData: UserRequest): Promise<UserResponse> => {
  const token: string = localStorage.getItem('token') || 'faketoken';
  try {
    const response = await fetch(`${config.url}/api/user`, {
      method: 'GET',
      headers: { name: userData.name, authorization: token },
    });
    const result = await response.json();
    if (result.status === 'error') return { error: result.message };
    else {
      return {
        avatar: result.avatar,
        money: result.money,
      };
    }
  } catch (err: any) {
    return err.message;
  }
};

export { userService };
