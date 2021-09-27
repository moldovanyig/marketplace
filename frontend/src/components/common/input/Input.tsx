import { ChangeEventHandler } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: ChangeEventHandler;
  className?: string;
}

const Input: React.FunctionComponent<InputProps> = ({
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
