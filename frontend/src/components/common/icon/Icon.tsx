import './Icon.css';

export interface IconProps {
  image: string;
  type: string;
  handleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ image, type, handleClick }) => {
  return <img src={image} alt={`Add ${type}`} onClick={handleClick} />;
};

export default Icon;
