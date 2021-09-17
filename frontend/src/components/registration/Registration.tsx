import { ChangeEvent, useState } from 'react';
import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Heading from '../common/heading';
import Input from '../common/input';
import Message from '../common/message';
import Btn from '../common/btn';
import Icon from '../common/icon';
import { register } from '../../services/registerService';
import { UserInfo } from '../../interfaces/user';
import './Registration.css';

import Avatar1 from '../../assets/avatars/1.png';
import Avatar2 from '../../assets/avatars/2.png';
import Avatar3 from '../../assets/avatars/3.png';
import Avatar4 from '../../assets/avatars/4.png';
import Avatar5 from '../../assets/avatars/5.png';
import Avatar6 from '../../assets/avatars/6.png';
import Avatar7 from '../../assets/avatars/7.png';
import Avatar8 from '../../assets/avatars/8.png';
import Avatar9 from '../../assets/avatars/9.png';
import Avatar10 from '../../assets/avatars/10.png';
import Avatar11 from '../../assets/avatars/11.png';
import Avatar12 from '../../assets/avatars/12.png';

const Registration = () => {
  const [hasBtnBeenClicked, setHasBtnBeenClicked] = useState(false);

  const [name, setName] = useState('');
  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const [isUserNameValid, setUserNameValid] = useState(false);

  const [password, setPassword] = useState('');
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const [isPasswordValid, setPasswordValid] = useState(false);

  const [message, setMessage] = useState('');
  const [isRegSuccessful, setRegSuccessful] = useState(false);

  let history = useHistory();
  const avatars: Array<string> = [
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
    Avatar8,
    Avatar9,
    Avatar10,
    Avatar11,
    Avatar12,
  ];

  const [avatar, setAvatar] = useState('');
  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setHasBtnBeenClicked(true);

    let newUser: UserInfo = { name: '', password: '', avatar: '' };

    if (name.length === 0 && password.length < 8 && avatar === '') {
      setUserNameValid(false);
      setPasswordValid(false);
      setRegSuccessful(false);
      setMessage('Name, password and avatar are required.');
      return;
    } else if (name.length === 0 && password.length >= 8 && avatar === '') {
      setUserNameValid(false);
      setPasswordValid(true);
      setRegSuccessful(false);
      setMessage('Name and avatar are required.');
      return;
    } else if (name.length > 0 && password.length >= 8 && avatar === '') {
      setUserNameValid(true);
      setPasswordValid(true);
      setRegSuccessful(false);
      setMessage('Avatar is required.');
      return;
    } else if (name.length > 0 && password.length < 8) {
      setUserNameValid(true);
      setPasswordValid(false);
      setRegSuccessful(false);
      setMessage('Your password should be at least 8 characters.');
      return;
    } else if (name.length > 0 && password.length >= 8) {
      setUserNameValid(true);
      setPasswordValid(true);
      newUser.name = name;
      newUser.password = password;
      newUser.avatar = avatar;

      let result: string = await register(newUser);

      if (result && result !== '') {
        setUserNameValid(false);
        setMessage(result);
        setRegSuccessful(false);
        return;
      } else {
        setMessage('Successful registration');
        setRegSuccessful(true);
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      }
    }
  };

  return (
    <div className="center-middle">
      <Heading className="register-title" label="Register to Marketplace" />
      <form className="register-form" onSubmit={handleOnSubmit}>
        <Input
          type="text"
          placeholder="name"
          value={name}
          onChange={onUsernameChange}
          className={
            hasBtnBeenClicked
              ? isUserNameValid
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
              ? isPasswordValid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />
        <div className="avatars">
          {avatars.map((element, index) => {
            return (
              <Icon
                key={`avatar-${index}`}
                image={element}
                type={`avatar${element}`}
                handleClick={() => setAvatar(element.slice(14, 16))}
              />
            );
          })}
        </div>
        <Message message={message} isValid={isRegSuccessful} />
        <Btn label="Registration" />
      </form>
    </div>
  );
};

export default Registration;
