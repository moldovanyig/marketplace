import { connect } from 'react-redux';

import ItemById from './ItemById';

interface ItemState {
  item: {
    title: string;
    description: string;
    photo_url: string;
    price: number;
    name: string;
    buyers_name: string | null;
    avatar: number;
  };
}

const mapStateToProps = (state: ItemState) => {
  const { title, description, photo_url, price, name, buyers_name, avatar } =
    state.item;

  return {
    title,
    description,
    photo_url,
    price,
    name,
    buyers_name,
    avatar,
  };
};

export default connect(mapStateToProps)(ItemById);
