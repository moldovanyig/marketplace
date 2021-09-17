import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import store from '../../store';

import './Header.css';

interface HeaderProps {
  authorization: string;
  name: string;
}

const Header: FC<HeaderProps> = ({ authorization, name }) => {
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

  const handleClick = (): void => {
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
          <Link to="/">
            <h1>{name}</h1>
          </Link>
          <div className="header-links">
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
