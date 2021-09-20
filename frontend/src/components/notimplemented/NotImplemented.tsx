import { useHistory } from 'react-router-dom';
import Btn from '../common/btn';
import Heading from '../common/heading';

const NotImplemented: React.FunctionComponent = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };
  return (
    <div className="center-middle">
      <Heading className="not-implemented-title" label="Not implemented yet" />
      <Btn label="Go home" onClick={handleClick} />
    </div>
  );
};

export default NotImplemented;
