import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Heading from '../common/heading';
import Input from '../common/input';
import Message from '../common/message';
import Btn from '../common/btn';
import { authService } from '../../services/authService';

import './Login.css';

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [password, setPassword] = useState('');
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);
  const [hasBtnBeenClicked, setHasBtnBeenClicked] = useState(false);

  const loginData = { name, password };

  async function handleSubmit(event: FormEvent<HTMLElement>): Promise<void> {
    event.preventDefault();
    let errorMessage, authorization;
    const response = await authService(loginData);
    setHasBtnBeenClicked(true);
    response.error
      ? (errorMessage = response.error)
      : ({ authorization } = response);

    if (errorMessage) {
      setMessage(errorMessage);
      setValid(false);
    }

    if (authorization) {
      setMessage('');
      setValid(true);

      window.dispatchEvent(new Event('storage'));
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  }

  return (
    <div className="center-middle">
      <Heading className={'login-title'} label={'Login to Marketplace'} />
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="username"
          value={name}
          onChange={onUsernameChange}
          className={
            hasBtnBeenClicked
              ? valid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={onPasswordChange}
          className={
            hasBtnBeenClicked
              ? valid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />
        <Message message={message} isValid={valid} />
        <Btn label="login" />
      </form>
    </div>
  );
};

export default Login;