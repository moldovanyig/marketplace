import { MouseEventHandler } from 'react';

interface BtnProps {
  label: string;
  onClick?: MouseEventHandler;
}

const Btn: React.FunctionComponent<BtnProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Btn;
