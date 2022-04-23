import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Col, Footer, MeetingDetailsSidePanel, MeetingLinkPopUp, Row } from '../../components';
import { useMeet } from '../../contexts';
import { useMeetingStyles } from './Meeting.styles';

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
    onScreenShareClick,
    videos,
    socketInstance
  } = useMeet();

  useEffect(() => {
    setTimeout(() => {
      setShowMeetingLinkPopUp(false);
    }, 6000);
  }, []);

  return (
    <div className={classes.outerContainer}>
      <Row>
        {Object.entries(videos ?? {}).map(([key, value]) => (
          <Col xs={12} sm={6} lg={4} key={key}>
            <div className={classes.posRelative}>
              <div className={classes.minh38}>
                {value.status?.video && (
                  <video
                    ref={(video) => {
                      /* eslint-disable-next-line */
                      if (video) video.srcObject = value.stream;
                    }}
                    autoPlay
                    className={classes.video}
                    muted={socketInstance?.current?.myId === key}
                  />
                )}
              </div>
              <div className={clsx(classes.centerDiv, !value.status?.video && classes.videoOff)}>
                {!value.status?.video &&
                  (value.imageUrl ? (
                    <img
                      src={value.imageUrl}
                      alt='avatar'
                      loading='lazy'
                      referrerPolicy='no-referrer'
                      className={classes.userAvatar}
                    />
                  ) : (
                    <FaRegUserCircle size='6rem' aria-label='default avatar' />
                  ))}
                <br />
                {value?.name}
              </div>
            </div>
          </Col>
        ))}
      </Row>
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
