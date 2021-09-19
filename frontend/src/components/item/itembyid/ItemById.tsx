import { useMemo, useRef, useState } from 'react';
import Heading from '../../common/heading';
import Btn from '../../common/btn';
import Message from '../../common/message';
import { buyItemService } from '../../../services/buyItemService';

import Avatar1 from '../../../assets/avatars/1.png';
import Avatar2 from '../../../assets/avatars/2.png';
import Avatar3 from '../../../assets/avatars/3.png';
import Avatar4 from '../../../assets/avatars/4.png';
import Avatar5 from '../../../assets/avatars/5.png';
import Avatar6 from '../../../assets/avatars/6.png';
import Avatar7 from '../../../assets/avatars/7.png';
import Avatar8 from '../../../assets/avatars/8.png';
import Avatar9 from '../../../assets/avatars/9.png';
import Avatar10 from '../../../assets/avatars/10.png';
import Avatar11 from '../../../assets/avatars/11.png';
import Avatar12 from '../../../assets/avatars/12.png';

interface ItemByIdProps {
  title: string;
  description: string;
  photo_url: string;
  price: number;
  name: string;
  buyers_name: string | null;
  avatar: number;
}

const ItemById: React.FunctionComponent<ItemByIdProps> = ({
  title,
  description,
  photo_url,
  price,
  name,
  buyers_name,
  avatar,
}) => {
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);
  const handleClick = async (): Promise<void> => {
    const response = await buyItemService({ title });

    if (response.status === 'error') {
      setMessage(response.message);
      setValid(false);
    } else {
      setMessage(response.message);
      setValid(true);
    }
    setTimeout(() => {
      setMessage('');
    }, 10000);
  };
  const avatars: Array<string> = [];
  let choosenAvatar = useRef(avatars[avatar]);
  useMemo(() => {
    const avatars = [
      Avatar1,
      Avatar2,
      Avatar3,
      Avatar4,
      Avatar5,
      Avatar6,
      Avatar7,
      Avatar8,
      Avatar9,
      Avatar10,
      Avatar11,
      Avatar12,
    ];
    choosenAvatar.current = avatars[avatar - 1];
  }, [avatar]);
  return (
    <div>
      <Heading className="" label={title} />
      {description && <p>{description}</p>}
      <img src={photo_url} alt={photo_url} />
      {price && <p>Cost: {price} credit.</p>}
      {name && (
        <p>
          The seller is {name}
          <img src={choosenAvatar.current} alt="avatar" />
        </p>
      )}
      {buyers_name ? (
        <p>This item was bought by {buyers_name}.</p>
      ) : title ? (
        <>
          <Btn label={'Buy'} onClick={handleClick} />
          <Message message={message} isValid={valid} />
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default ItemById;
