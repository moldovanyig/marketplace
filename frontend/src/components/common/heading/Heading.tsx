import { FC } from 'react';

export interface HeadingProps {
  label: string;
  className: string;
}

const Heading: FC<HeadingProps> = ({ label, className }) => {
  return <h1 className={className}>{label}</h1>;
};

export default Heading;
