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
  const [camStatus, setCamStatus] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [chatToggle, setChatToggle] = useState(false);
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

  const handleDisconnect = () => {
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
          isMicOn ? track.stop() : reInitializeStream(camStatus, !isMicOn);
      });
    setIsMicOn(!isMicOn);
  };

  const handleCam = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = socketInstance.current;
      toggleVideoTrack({ audio: isMicOn, video: !camStatus });
      setCamStatus(!camStatus);
    }
  };

  const toggleScreenShare = () => {
    const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
    displayStream && toggleVideoTrack({ audio: true, video: false });
    reInitializeStream(false, true, !displayStream ? 'displayMedia' : 'userMedia').then(() => {
      setDisplayStream(!displayStream);
      setCamStatus(false);
    });
  };

  useEffect(() => {
    startConnection();
    return () => {
      socketInstance.current?.destoryConnection();
    };
  }, []);

  return (
    <div className={classes.outerContainer}>
      <div id='room-container' />
      <MeetingLinkPopUp link={`http://localhost:3000/meet/${meetingCode}`} />
      <MeetingDetailsSidePanel />
      <div className={classes.footer}>
        <Footer
          meetingCode={meetingCode}
          disconnect={handleDisconnect}
          isMicOn={isMicOn}
          onMicClick={onMicClick}
        />
      </div>
    </div>
  );
};
