import { FiMic, FiMicOff } from 'react-icons/fi';
import { useFooterStyles } from './Footer.styles';

export const Mic = ({ isOn }) => {
  const { roundButton } = useFooterStyles();

  return <button className={roundButton}>{isOn ? <FiMic /> : <FiMicOff />}</button>;
};
