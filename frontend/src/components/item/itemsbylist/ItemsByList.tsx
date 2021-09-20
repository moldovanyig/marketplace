import { ItemDetails } from '.';
import Heading from '../../common/heading';

interface ItemsByListProps {
  items: Array<ItemDetails>;
}

const ItemsByList: React.FunctionComponent<ItemsByListProps> = (items) => {
  return (
    <div>
      {items &&
        items.items.map((item, index) => {
          return (
            <div key={`item-${index}`}>
              <Heading className="" label={item.title} />
              <img src={item.photo_url} alt={item.photo_url} />
              <p>Cost: {item.price} credit.</p>
            </div>
          );
        })}
    </div>
  );
};

export default ItemsByList;
