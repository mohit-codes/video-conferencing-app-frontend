import { FiCopy } from 'react-icons/fi';
import { usePopUpStyles } from './MeetingLinkPopUp.styles';
import { copyToClipBoard } from '../../../utils/utility';

export const MeetingLinkPopUp = ({ link }) => {
  const classes = usePopUpStyles();
  return (
    <div className={classes.popUp}>
      <p className={classes.heading}>Your meeting is ready</p>
      <p>Share this link with other you want in meeting.</p>
      <button
        aria-label='copy to clipboard'
        className={classes.linkBox}
        onClick={() => copyToClipBoard(link)}
      >
        {link}
        <FiCopy size='24' />
      </button>
      <p>your permission is required for anyone who requests to join the meeting.</p>
    </div>
  );
};
