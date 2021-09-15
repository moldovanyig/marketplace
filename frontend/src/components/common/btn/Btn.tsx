import { FC, MouseEventHandler } from 'react';
import './Btn.css';

interface BtnProps {
  label: string;
  onClick?: MouseEventHandler;
}

const Btn: FC<BtnProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Btn;
