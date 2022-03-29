import { FiMic, FiMicOff } from 'react-icons/fi';
import { useFooterStyles } from './Footer.styles';

export const MicButton = ({ isOn, clickCallback }) => {
  const { roundButton } = useFooterStyles();

  return (
    <button className={roundButton} onClick={clickCallback}>
      {isOn ? <FiMic size='1.2rem' /> : <FiMicOff size='1.2rem' />}
    </button>
  );
};
