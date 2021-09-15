import { FC, ChangeEventHandler } from 'react';
import './Input.css';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler;
  className?: string;
}

const Input: FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
