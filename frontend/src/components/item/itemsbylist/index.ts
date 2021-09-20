import { connect } from 'react-redux';

import ItemsByList from './ItemsByList';

export interface ItemDetails {
  title: string;
  photo_url: string;
  price: number;
}

interface ItemState {
  items: Array<ItemDetails>;
}

const mapStateToProps = (state: ItemState) => {
  const items: Array<ItemDetails> = [];
  state.items.map((item) => items.push(item));
  return {
    items,
  };
};

export default connect(mapStateToProps)(ItemsByList);
