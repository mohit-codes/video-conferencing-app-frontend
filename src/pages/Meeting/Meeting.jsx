import { useMeetingStyles } from './Meeting.styles';
import { MeetingDetailsSidePanel, MeetingLinkPopUp } from '../../components';

export const Meeting = () => {
  const classes = useMeetingStyles();
  return (
    <div className={classes.outerContainer}>
      <MeetingLinkPopUp link='.com/meet/ZZZZZ' />
      <MeetingDetailsSidePanel />
    </div>
  );
};
