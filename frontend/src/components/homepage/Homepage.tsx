import { ChangeEvent, FormEvent, useState } from 'react';
import {
  searchIdService,
  searchListService,
} from '../../services/searchItemService';
import Btn from '../common/btn';
import Heading from '../common/heading';
import Input from '../common/input';
import Message from '../common/message';

interface HomepageProps {
  saveItemInfo: Function;
}

const Homepage: React.FunctionComponent<HomepageProps> = ({ saveItemInfo }) => {
  const [title, setTitle] = useState('');
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const [description, setDescription] = useState('');
  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const [priceLowerThan, setPriceLowerThan] = useState(0);
  const onPriceLowerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceLowerThan(Number(event.target.value));
  };

  const [priceGreaterThan, setPriceGreaterThan] = useState(0);
  const onPriceGreaterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceGreaterThan(Number(event.target.value));
  };

  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);

  async function handleListSubmit(
    event: FormEvent<HTMLElement>
  ): Promise<void> {
    event.preventDefault();
    let request = [];
    if (title) request.push(`title=${title}`);
    if (description) request.push(`description=${description}`);
    if (priceLowerThan) request.push(`priceLowerThan=${priceLowerThan}`);
    if (priceGreaterThan) request.push(`priceGreaterThan=${priceGreaterThan}`);
    const response = await searchListService(request.join('&'));

    if (response.status) {
      setValid(false);
      setMessage(response.message);
    } else {
      setMessage('');
      setValid(true);
      saveItemInfo(response);
    }
  }

  const [id, setId] = useState(0);
  const onIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  async function handleIdSubmit(event: FormEvent<HTMLElement>): Promise<void> {
    event.preventDefault();
    const response = await searchIdService(id);

    if (response.status) {
      setValid(false);
      setMessage(response.message);
    } else {
      setMessage('');
      setValid(true);
      saveItemInfo(response);
    }
  }

  return (
    <div>
      <Heading className={'login-title'} label="Search by details" />
      <form onSubmit={handleListSubmit}>
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={onTitleChange}
          className={'neutral-field'}
        />
        <Input
          type="text"
          placeholder="description"
          value={description}
          onChange={onDescriptionChange}
          className={'neutral-field'}
        />
        <Input
          type="number"
          placeholder="price is lower than"
          value={priceLowerThan}
          onChange={onPriceLowerChange}
          className={'neutral-field'}
        />

        <Input
          type="number"
          placeholder="price is greater than"
          value={priceGreaterThan}
          onChange={onPriceGreaterChange}
          className={'neutral-field'}
        />
        <Message message={message} isValid={valid} />
        <Btn label="Search" />
      </form>
      <Heading className={'login-title'} label="Search by id" />
      <form onSubmit={handleIdSubmit}>
        <Input
          type="text"
          placeholder="id"
          value={id}
          onChange={onIdChange}
          className={'neutral-field'}
        />
        <Message message={message} isValid={valid} />
        <Btn label="Search" />
      </form>
    </div>
  );
};

export default Homepage;
