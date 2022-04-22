import Peer from 'peerjs';
import openSocket from 'socket.io-client';
import { config } from '../config';

let socketInstance = null;
const peers = {};

const initializePeerConnection = () =>
  new Peer('', {
    host: config.peerHost,
    path: '/peerjs',
    port: 8080,
    secure: config.peerSecure
  });

const initializeSocketConnection = () =>
  openSocket.connect(config.webSocketUrl, {
    reconnection: true,
    reconnectionAttempts: 10,
    rejectUnauthorized: false,
    secure: false
  });

class SocketConnection {
  videoContainer = {};

  messages = [];

  participants = [];

  settings;

  myPeer;

  socket;

  isSocketConnected = false;

  isPeerConnected = false;

  myId = '';

  constructor(settings) {
    this.settings = settings;
    this.socket = initializeSocketConnection();
    this.setNavigatorToStream();
    if (this.socket) this.isSocketConnected = true;
    if (this.myPeer) this.isPeerConnected = true;
  }

  initPeerEvents = (stream) => {
    this.myPeer = initializePeerConnection();
    this.myPeer.on('open', (id) => {
      const { userDetails } = this.settings;
      this.myID = id;
      const roomID = window.location.pathname.split('/')[2];
      const userData = {
        roomID,
        userID: id,
        ...userDetails
      };
      console.log('peers established and joined room', userData);
      this.socket.emit('join-room', userData);
      this.participants.push(userData);
      this.settings.updateInstance('addParticipant', userData);
      this.createVideo({
        id,
        stream,
        ...userDetails,
        status: { audio: true, video: true }
      });
    });
    this.myPeer.on('error', (err) => {
      console.log('peer connection error', err);
      this.myPeer.reconnect();
    });
  };

  initSocketEvents = () => {
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('user-disconnected', (userID) => {
      console.log('user disconnected-- closing peers', userID);
      peers[userID] && peers[userID].close();
      this.removeVideo(userID);
      this.participants = this.participants.filter((peer) => peer.userID !== userID);
      this.settings.updateInstance('removeParticipant', userID);
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected --');
    });
    this.socket.on('error', (err) => {
      console.log('socket error --', err);
    });
    this.socket.on('new-broadcast-messsage', (data) => {
      this.messages.push(data);
      this.settings.updateInstance('message', data);
      console.log(`${data.message} By ${data.userData.name}`);
    });
    this.socket.on('display-media', (data) => {
      //  show full screen if sharing screen
      // if (data.value) checkAndAddClass(document.getElementById(data.userID), 'displayMedia');
      // else checkAndAddClass(document.getElementById(data.userID), 'userMedia');
    });
    this.socket.on('toggle-video', (data) => {
      this.toggleVideoTrack(data.status, data.id);
    });
  };

  getVideoAudioStream = (video = true, audio = true) =>
    navigator.mediaDevices.getUserMedia({
      audio,
      video: video
        ? {
            frameRate: 15,
            height: { ideal: 720, max: 1080, min: 480 },
            noiseSuppression: true,
            width: { ideal: 580, max: 1920, min: 640 }
          }
        : false
    });

  setNavigatorToStream = () => {
    this.getVideoAudioStream()
      .then((stream) => {
        if (stream) {
          this.initSocketEvents();
          this.initPeerEvents(stream);
          this.newUserConnection(stream);
          this.setPeersListeners(stream);
        }
      })
      .catch((error) => {
        alert('Cannot load media. Please Reload');
        console.log(error.name, error.message);
      });
  };

  setPeersListeners = (stream) => {
    this.myPeer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (stream) => {
        this.createVideo({ ...call.metadata, status: { audio: true, video: true }, stream });
      });
      call.on('close', () => {
        console.log('closing peers listeners', call.metadata.id);
        this.removeVideo(call.metadata.id);
      });
      call.on('error', () => {
        console.log('peer error ------');
        this.removeVideo(call.metadata.id);
      });
      peers[call.metadata.id] = call;
    });
  };

  createVideo = (createObj) => {
    this.videoContainer[createObj.id] = {
      ...createObj,
      name: createObj.id === this.myID ? 'Me' : createObj.name
    };
    this.settings.updateInstance('updateVideos', { ...this.videoContainer });
  };

  newUserConnection = (stream) => {
    this.socket.on('new-user-connect', (userData) => {
      console.log('New user connected', userData);
      // eslint-disable-next-line
      const { userID } = userData;
      this.participants.push(userData);
      this.settings.updateInstance('addParticipant', userData);
      const call = this.myPeer.call(userID, stream, {
        metadata: {
          id: this.myID,
          ...this.settings.userDetails
        }
      });
      let onlyOnce = false;
      call.on('stream', (stream) => {
        if (!onlyOnce) {
          this.createVideo({
            id: userID,
            stream,
            ...userData,
            status: { audio: true, video: true }
          });
        }
        onlyOnce = true;
      });
      call.on('close', () => {
        console.log('closing user', userID);
        this.removeVideo(userID);
      });
      call.on('error', () => {
        console.log('peer error ------');
        this.removeVideo(userID);
      });
      peers[userID] = call;
    });
  };

  removeVideo = (id) => {
    delete this.videoContainer[id];
    this.settings.updateInstance('updateVideos', { ...this.videoContainer });
  };

  getMyVideo = (id = this.myID) => document.getElementById(id);

  reInitializeStream = (video, audio, type = 'userMedia') => {
    const media =
      type === 'userMedia'
        ? this.getVideoAudioStream(video, audio)
        : navigator.mediaDevices.getDisplayMedia();
    return new Promise((resolve) => {
      media.then((stream) => {
        if (type === 'displayMedia') {
          this.toggleVideoTrack({ audio, video });
          this.listenToEndStream(stream, { audio, video });
          this.socket.emit('display-media', true);
        }

        this.createVideo({
          id: this.myID,
          stream,
          ...this.settings.userDetails,
          status: { audio, video }
        });
        this.replaceStream(stream);
        resolve(true);
      });
    });
  };

  listenToEndStream = (stream, status) => {
    const videoTrack = stream.getVideoTracks();
    if (videoTrack[0]) {
      videoTrack[0].onended = () => {
        this.socket.emit('display-media', false);
        this.reInitializeStream(status.video, status.audio, 'userMedia');
        this.settings.updateInstance('displayStream', false);
        this.toggleVideoTrack(status);
      };
    }
  };

  toggleVideoTrack = (status, id = this.myID) => {
    const myVideo = this.videoContainer[id];
    if (!status.video) {
      myVideo.status = { ...myVideo.status, video: false };
      if (id === this.myID) {
        this.socket.emit('video-off', id);
        myVideo.srcObject?.getVideoTracks().forEach((track) => {
          if (track.kind === 'video') {
            !status.video && track.stop();
          }
        });
      }
    } else if (id === this.myID) {
      this.socket.emit('video-on', id);
      this.reInitializeStream(status.video, status.audio);
    } else {
      myVideo.status = { ...myVideo.status, video: true };
    }
    this.settings.updateInstance('updateVideos', { ...this.videoContainer });
  };

  toggleAudioTrack = (status) => {
    const myVideo = this.videoContainer[this.myID];
    myVideo.stream?.getAudioTracks().forEach((track) => {
      // eslint-disable-next-line
      if (track.kind === 'audio') track.enabled = status.audio;
      status.audio ? this.reInitializeStream(status.video, status.audio) : track.stop();
    });
  };

  destroyConnection = () => {
    const myMediaTracks = this.videoContainer[this.myID]?.stream.getTracks();
    myMediaTracks?.forEach((track) => {
      track.stop();
    });
    socketInstance?.socket.disconnect();
    this.myPeer.destroy();
  };

  replaceStream = (mediaStream) => {
    Object.values(peers).forEach((peer) => {
      peer.peerConnection?.getSenders().forEach((sender) => {
        if (sender.track.kind === 'audio') {
          if (mediaStream.getAudioTracks().length > 0) {
            sender.replaceTrack(mediaStream.getAudioTracks()[0]);
          }
        }
        if (sender.track.kind === 'video') {
          if (mediaStream.getVideoTracks().length > 0) {
            sender.replaceTrack(mediaStream.getVideoTracks()[0]);
          }
        }
      });
    });
  };

  sendMessage = (text) => {
    this.socket.emit('broadcast-message', {
      message: text
    });
  };
}

export function createSocketInstance(settings = {}) {
  socketInstance = new SocketConnection(settings);
  return socketInstance;
}
