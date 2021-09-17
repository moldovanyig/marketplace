import { connect } from 'react-redux';

import Header from './Header';
import { LoginInfo } from '../../interfaces/login';

interface HeaderState {
  user: {
    authorization: string;
    name: string;
  };
}

const mapStateToProps = (state: HeaderState) => {
  const { authorization, name } = state.user;

  return {
    authorization,
    name,
  };
};

export default connect(mapStateToProps)(Header);
