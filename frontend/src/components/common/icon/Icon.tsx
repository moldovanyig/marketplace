export interface IconProps {
  image: string;
  type: string;
  handleClick: () => void;
}

const Icon: React.FunctionComponent<IconProps> = ({
  image,
  type,
  handleClick,
}) => {
  return <img src={image} alt={`Add ${type}`} onClick={handleClick} />;
};

export default Icon;
