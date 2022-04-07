import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMeetingStyles } from './Meeting.styles';
import { Footer, MeetingDetailsSidePanel, MeetingLinkPopUp } from '../../components';
import { useAuth } from '../../contexts/authContext';
import { createSocketInstance } from '../../utils/socketInstance';

export const Meeting = () => {
  const classes = useMeetingStyles();
  const { meetingCode } = useParams();
  const navigate = useNavigate();
  const socketInstance = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const {
    state: { user }
  } = useAuth();
  const [displayStream, setDisplayStream] = useState(false);
  const [messages, setMessages] = useState([]);

  const updateFromInstance = (key, value) => {
    if (key === 'streaming') setStreaming(value);
    else if (key === 'message') setMessages([...value]);
    else if (key === 'displayStream') setDisplayStream(value);
  };

  const startConnection = () => {
    socketInstance.current = createSocketInstance({
      updateInstance: updateFromInstance,
      userDetails: user
    });
  };

  const onDisconnect = () => {
    console.log('disconnect');
    socketInstance.current?.destroyConnection();
    navigate('/');
  };

  const onMicClick = () => {
    const { getMyVideo, reInitializeStream } = socketInstance.current;
    const myVideo = getMyVideo();
    if (myVideo)
      myVideo.srcObject?.getAudioTracks().forEach((track) => {
        if (track.kind === 'audio')
          // track.enabled = !isMicOn;
          isMicOn ? track.stop() : reInitializeStream(isCamOn, !isMicOn);
      });
    setIsMicOn(!isMicOn);
  };

  const onCamClick = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = socketInstance.current;
      toggleVideoTrack({ audio: isMicOn, video: !isCamOn });
      setIsCamOn(!isCamOn);
    }
  };

  const onScreenShareClick = () => {
    const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
    displayStream && toggleVideoTrack({ audio: true, video: false });
    reInitializeStream(false, true, !displayStream ? 'displayMedia' : 'userMedia').then(() => {
      setDisplayStream(!displayStream);
      setIsCamOn(false);
    });
  };

  useEffect(() => {
    startConnection();
    return () => {
      socketInstance.current?.destoryConnection();
    };
  }, []);
  console.log(Footer);

  return (
    <div className={classes.outerContainer}>
      <div id='room-container' />
      <MeetingLinkPopUp link={`http://localhost:3000/meet/${meetingCode}`} />
      <MeetingDetailsSidePanel />
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
        />
      </div>
    </div>
  );
};
