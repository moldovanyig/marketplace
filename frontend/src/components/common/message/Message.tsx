import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MessageProps {
  message?: string;
  className?: string;
  isValid?: boolean;
}

const Message: React.FunctionComponent<MessageProps> = ({
  message,
  isValid,
}) => {
  const exclamationTriangle = (
    <FontAwesomeIcon
      icon="exclamation-triangle"
      className="exclamation-triangle"
    />
  );

  return (
    <div className={`message-container ${isValid ? 'successful' : 'error'}`}>
      <span>
        {message}
        {message && !isValid && exclamationTriangle}
      </span>
    </div>
  );
};

export default Message;
