import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { addItemService } from '../../../services/addItemService';
import Btn from '../../common/btn';
import Heading from '../../common/heading';
import Input from '../../common/input';
import Message from '../../common/message';

interface AddItemProps {}

const AddItem: React.FunctionComponent<AddItemProps> = () => {
  let history = useHistory();

  const [title, setTitle] = useState('');
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const [isTitleValid, setTitleValid] = useState(false);

  const [description, setDescription] = useState('');
  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const [isDescriptionValid, setDescriptionValid] = useState(false);

  const [photoUrl, setPhotoUrl] = useState('');
  const onPhotoUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(event.target.value);
  };
  const [isPhotoValid, setPhotoValid] = useState(false);

  const [price, setPrice] = useState(0);
  const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  const [isPriceValid, setPriceValid] = useState(false);

  const addItemData = { title, description, photoUrl, price };

  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);
  const [hasBtnBeenClicked, setHasBtnBeenClicked] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLElement>): Promise<void> {
    event.preventDefault();
    setHasBtnBeenClicked(true);

    if (
      title.length === 0 &&
      description.length === 0 &&
      photoUrl.length === 0 &&
      price <= 0
    ) {
      setTitleValid(false);
      setDescriptionValid(false);
      setPhotoValid(false);
      setPriceValid(false);
      setValid(false);
      setMessage('All input fields are required!');
      return;
    } else if (
      title.length > 0 &&
      description.length === 0 &&
      photoUrl.length === 0 &&
      price <= 0
    ) {
      setTitleValid(true);
      setDescriptionValid(false);
      setPhotoValid(false);
      setPriceValid(false);
      setValid(false);
      setMessage('Description, photo and price fields are required!');
      return;
    } else if (
      title.length > 0 &&
      description.length > 0 &&
      photoUrl.length === 0 &&
      price <= 0
    ) {
      setTitleValid(true);
      setDescriptionValid(true);
      setPhotoValid(false);
      setPriceValid(false);
      setValid(false);
      setMessage('Photo and price fields are required!');
      return;
    } else if (
      (title.length > 0 &&
        description.length > 0 &&
        photoUrl.length > 0 &&
        price === 0) ||
      !Number.isInteger(price)
    ) {
      setTitleValid(true);
      setDescriptionValid(true);
      setPhotoValid(true);
      setPriceValid(false);
      setValid(false);
      setMessage('Price must be a positive integer number!');
      return;
    } else if (
      title.length > 0 &&
      description.length > 0 &&
      photoUrl.length > 0 &&
      Number.isInteger(price) &&
      price >= 0
    ) {
      setTitleValid(true);
      setDescriptionValid(true);
      setPhotoValid(true);
      setPriceValid(true);
      setValid(true);
      const response = await addItemService(addItemData);

      if (response.status === 'error') {
        setValid(false);
        setMessage(response.message);
        return;
      } else {
        setValid(true);
        setMessage(response.message);
        setTimeout(() => {
          history.push('/');
        }, 2000);
      }
    }
  }
  return (
    <div className="center-middle">
      <Heading label={'Add new item'} />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={onTitleChange}
          className={
            hasBtnBeenClicked
              ? isTitleValid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />

        <Input
          type="text"
          placeholder="description"
          value={description}
          onChange={onDescriptionChange}
          className={
            hasBtnBeenClicked
              ? isDescriptionValid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />
        <Input
          type="text"
          placeholder="photo link"
          value={photoUrl}
          onChange={onPhotoUrlChange}
          className={
            hasBtnBeenClicked
              ? isPhotoValid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />
        <Input
          type="number"
          placeholder="price"
          value={price}
          onChange={onPriceChange}
          className={
            hasBtnBeenClicked
              ? isPriceValid
                ? 'valid-field'
                : 'invalid-field'
              : 'neutral-field'
          }
        />
        <Message message={message} isValid={valid} />
        <div className="douple-buttons">
          <Btn label="add new item" />
          <Btn label="back" onClick={() => history.push('/')} />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
