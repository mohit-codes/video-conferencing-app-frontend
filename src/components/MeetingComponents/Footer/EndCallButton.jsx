import { FiPhone } from 'react-icons/fi';
import { useFooterStyles } from './Footer.styles';

export const EndCallButton = ({ onClick }) => {
  const { endCallButton } = useFooterStyles();

  return (
    <button className={endCallButton} onClick={onClick}>
      <FiPhone size='20' />
    </button>
  );
};
