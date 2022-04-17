/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSocketInstance } from '../utils/socketInstance';
import { useAuth } from './authContext';

export const MeetContext = createContext();

export const MeetProvider = ({ children }) => {
  const socketInstance = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const {
    state: { user }
  } = useAuth();
  const navigate = useNavigate();
  const [displayStream, setDisplayStream] = useState(false);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [videos, setVideos] = useState({});

  const updateFromInstance = (key, value) => {
    const actmap = {
      addParticipant: (v) => setParticipants((prevState) => [...prevState, v]),
      displayStream: setDisplayStream,
      message: setMessages,
      removeParticipant: (v) =>
        setParticipants((prevState) => prevState.filter((peer) => peer.userID !== v)),
      updateVideos: setVideos
    };
    actmap?.[key]?.(value);
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
    window.location.reload();
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

  const sendMessage = (msg) => {
    socketInstance.current.sendMessage(msg);
  };

  useEffect(() => {
    startConnection();
    return () => {
      socketInstance.current?.destroyConnection();
    };
  }, []);

  return (
    <MeetContext.Provider
      value={{
        displayStream,
        isCamOn,
        isMicOn,
        messages,
        onCamClick,
        onDisconnect,
        onMicClick,
        onScreenShareClick,
        participants,
        sendMessage,
        socketInstance,
        videos
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeet = () => useContext(MeetContext);
