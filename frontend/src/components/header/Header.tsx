import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import store from '../../store';

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

interface HeaderProps {
  authorization: string;
  name: string;
  avatar: number;
  money: number;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  authorization,
  name,
  avatar,
  money,
}) => {
  const history = useHistory();
  const [headerLoggedIn, setHeaderLoggedIn] = useState(false);

  useEffect(() => {
    const checkStorage = (): void => {
      if (authorization && name) {
        setHeaderLoggedIn(true);
      } else {
        setHeaderLoggedIn(false);
      }
    };
    checkStorage();
  }, [authorization, name]);

  const avatars: Array<string> = [];
  let choosenAvatar = useRef(avatars[avatar]);
  useMemo(() => {
    const avatars = [
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
    choosenAvatar.current = avatars[avatar - 1];
  }, [avatar]);

  const handleClick = (): void => {
    localStorage.removeItem('token');
    history.push('/login');
    store.dispatch({ type: 'USER_LOGGED_OUT' });
  };

  return (
    <nav className="header">
      {!headerLoggedIn ? (
        <>
          <h1>Marketplace</h1>
          <div className="header-links">
            <Link to="/login">Login</Link>
            <Link to="/registration">Registration</Link>
          </div>
        </>
      ) : (
        <>
          <img src={choosenAvatar.current} alt="avatar" />
          <h1>
            Hello {name}, you have {money} credit.
          </h1>

          <div className="header-links">
            <Link to="/item">Sell</Link>
            <Link onClick={handleClick} to="/login">
              Logout
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
