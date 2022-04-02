import { FiMessageSquare, FiUsers } from 'react-icons/fi';
import { CamButton } from './CamButton';
import { useFooterStyles } from './Footer.styles';
import { MicButton } from './MicButton';
import { EndCallButton } from './EndCallButton';

export const Footer = ({ meetingCode, disconnect, isMicOn, onMicClick }) => {
  const classes = useFooterStyles();

  return (
    <div className={classes.footer}>
      <p>{`03:00 PM - ${meetingCode}`}</p>
      <div className={classes.userOptions}>
        <MicButton isOn={isMicOn} onClick={onMicClick} />
        <CamButton />
        <EndCallButton onClick={disconnect} />
      </div>
      <div className={classes.popUpTriggers}>
        <FiUsers role='button' size='24' aria-label='show participants' />
        <FiMessageSquare role='button' size='24' aria-label='show chat' />
      </div>
    </div>
  );
};
