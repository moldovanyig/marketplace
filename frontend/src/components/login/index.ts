import { connect } from 'react-redux';

import Login from './Login';

import { saveUserInfo } from '../../store/actions/userAction';

const mapDispatchToProps = (dispatch: Function) => {
  return {
    saveUserInfo: (token: string) => dispatch(saveUserInfo(token)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
