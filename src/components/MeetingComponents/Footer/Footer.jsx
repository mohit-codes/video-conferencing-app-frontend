import { FiMessageSquare, FiUsers } from 'react-icons/fi';
import { CamButton } from './CamButton';
import { useFooterStyles } from './Footer.styles';
import { MicButton } from './MicButton';
import { EndCallButton } from './EndCallButton';

export const Footer = ({ meetingCode }) => {
  const classes = useFooterStyles();

  return (
    <div className={classes.footer}>
      <p>{`03:00 PM - ${meetingCode}`}</p>
      <div className={classes.userOptions}>
        <MicButton />
        <CamButton />
        <EndCallButton />
      </div>
      <div className={classes.popUpTriggers}>
        <FiUsers role='button' size='1.5rem' aria-label='show participants' />
        <FiMessageSquare role='button' size='1.5rem' aria-label='show chat' />
      </div>
    </div>
  );
};
