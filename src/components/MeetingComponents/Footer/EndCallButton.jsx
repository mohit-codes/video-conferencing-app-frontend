import { FiPhone } from 'react-icons/fi';
import { useFooterStyles } from './Footer.styles';

export const EndCallButton = ({ clickCallback }) => {
  const { endCallButton } = useFooterStyles();

  return (
    <button className={endCallButton} onClick={clickCallback}>
      <FiPhone size='1.2rem' />
    </button>
  );
};
