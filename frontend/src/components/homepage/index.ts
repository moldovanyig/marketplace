import { connect } from 'react-redux';

import Homepage from './Homepage';

import { saveListInfo, saveItemInfo } from '../../store/actions/itemAction';
import { ItemState } from '../../store/reducers/itemReducer';

const mapDispatchToProps = (dispatch: Function) => {
  return {
    saveListInfo: (data: ItemState[]) => dispatch(saveListInfo(data)),
    saveItemInfo: (data: ItemState) => dispatch(saveItemInfo(data)),
  };
};

export default connect(null, mapDispatchToProps)(Homepage);
