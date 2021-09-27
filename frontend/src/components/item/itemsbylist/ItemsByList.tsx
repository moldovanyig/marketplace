import { ItemDetails } from '.';

interface ItemsByListProps {
  items: Array<ItemDetails>;
}

const ItemsByList: React.FunctionComponent<ItemsByListProps> = (items) => {
  return (
    <div>
      {items &&
        items.items.map((item, index) => {
          return (
            <div className="card" key={`item-${index}`}>
              <h1 className="card-title">{item.title}</h1>
              <img src={item.photo_url} alt={item.photo_url} />
              <p className="card-body">Cost: {item.price} credit.</p>
            </div>
          );
        })}
    </div>
  );
};

export default ItemsByList;
