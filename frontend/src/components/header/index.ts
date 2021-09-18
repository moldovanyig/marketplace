import { connect } from 'react-redux';

import Header from './Header';

interface HeaderState {
  user: {
    authorization: string;
    name: string;
    avatar: number;
    money: number;
  };
}

const mapStateToProps = (state: HeaderState) => {
  const { authorization, name, avatar, money } = state.user;

  return {
    authorization,
    name,
    avatar,
    money,
  };
};

export default connect(mapStateToProps)(Header);
