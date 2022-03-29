import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { useFooterStyles } from './Footer.styles';

export const CamButton = ({ isOn, clickCallback }) => {
  const { roundButton } = useFooterStyles();

  return (
    <button className={roundButton} onClick={clickCallback}>
      {isOn ? <BsCameraVideo size='1.2rem' /> : <BsCameraVideoOff size='1.2rem' />}
    </button>
  );
};
