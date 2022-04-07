import { FiMic, FiMicOff } from 'react-icons/fi';
import { useFooterStyles } from './Footer.styles';

export const MicButton = ({ isOn, onClick }) => {
  const { roundButton } = useFooterStyles();

  return (
    <button className={roundButton} onClick={onClick}>
      {isOn ? <FiMic size='20' /> : <FiMicOff size='20' />}
    </button>
  );
};
