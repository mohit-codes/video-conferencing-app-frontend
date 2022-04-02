import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { useFooterStyles } from './Footer.styles';

export const CamButton = ({ isOn, clickCallback }) => {
  const { roundButton } = useFooterStyles();

  return (
    <button className={roundButton} onClick={clickCallback}>
      {isOn ? <BsCameraVideo size='20' /> : <BsCameraVideoOff size='20' />}
    </button>
  );
};
