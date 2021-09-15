import { LoginInfo } from '../interfaces/login';
import { UserInfo } from '../interfaces/user';

import config from '../config';

const authService = async (loginData: UserInfo): Promise<LoginInfo> => {
  if (!loginData.name || !loginData.password) {
    return {
      error: 'All the input fields are required.',
    };
  }
  try {
    const response = await fetch(`${config.url}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    const result = await response.json();

    if (result.status === 'error') return { error: result.message };
    else {
      return {
        authorization: result.authorization,
      };
    }
  } catch (err: any) {
    return err.message;
  }
};

export { authService };
