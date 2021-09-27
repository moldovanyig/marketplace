import { ItemDetails } from '.';

interface ItemsByListProps {
  items: Array<ItemDetails>;
}

const ItemsByList: React.FunctionComponent<ItemsByListProps> = (items) => {
  return (
    <div className="container">
      <div className="row gap-2">
        {items &&
          items.items.map((item, index) => {
            return (
              <div
                className="col-12-xs col-5-sm col-3-xl"
                key={`item-${index}`}
              >
                <div className="card">
                  <h1 className="card-title">{item.title}</h1>
                  <img src={item.photo_url} alt={item.photo_url} />
                  <p className="card-body">Cost: {item.price} credit.</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ItemsByList;
