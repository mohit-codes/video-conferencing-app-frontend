import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMeetingStyles } from './Meeting.styles';
import { Footer, MeetingDetailsSidePanel, MeetingLinkPopUp } from '../../components';
import { useMeet } from '../../contexts';

export const Meeting = () => {
  const classes = useMeetingStyles();
  const { meetingCode } = useParams();
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showMeetingLinkPopUp, setShowMeetingLinkPopUp] = useState(true);
  const {
    onDisconnect,
    isMicOn,
    onMicClick,
    isCamOn,
    onCamClick,
    displayStream,
    onScreenShareClick
  } = useMeet();

  useEffect(() => {
    setTimeout(() => {
      setShowMeetingLinkPopUp(false);
    }, 10000);
  }, []);

  return (
    <div className={classes.outerContainer}>
      <div id='room-container' />
      {showMeetingLinkPopUp && (
        <MeetingLinkPopUp link={`http://localhost:3000/meet/${meetingCode}`} />
      )}
      {showSidePanel && <MeetingDetailsSidePanel setShowSidePanel={setShowSidePanel} />}
      <div className={classes.footer}>
        <Footer
          meetingCode={meetingCode}
          disconnect={onDisconnect}
          isMicOn={isMicOn}
          onMicClick={onMicClick}
          isCamOn={isCamOn}
          onCamClick={onCamClick}
          isScreenShareOn={displayStream}
          onScreenShareClick={onScreenShareClick}
          setShowSidePanel={setShowSidePanel}
        />
      </div>
    </div>
  );
};
