import { UserInfo } from '../interfaces/user';
import config from '../config';

const register = async (registrationData: UserInfo): Promise<string> => {
  try {
    const response = await fetch(`${config.url}/api/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    const result = await response.json();

    return result.message;
  } catch (err: any) {
    return err.message;
  }
};

export { register };
