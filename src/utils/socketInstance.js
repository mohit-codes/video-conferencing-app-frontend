import openSocket from 'socket.io-client';
import Peer from 'peerjs';

let socketInstance = null;
const peers = {};

const initializePeerConnection = () =>
  new Peer('', {
    host: 'localhost',
    port: 4430,
    secure: false
  });

const initializeSocketConnection = () =>
  openSocket.connect('ws://localhost:8080', {
    reconnection: true,
    reconnectionAttempts: 10,
    rejectUnauthorized: false,
    secure: false
  });

const checkAndAddClass = (video, type = 'userMedia') => {
  if (video?.classList?.length === 0 && type === 'displayMedia')
    video.classList.add('display-media');
  else video.classList.remove('display-media');
};

const replaceStream = (mediaStream) => {
  Object.values(peers).map((peer) => {
    peer.peerConnection?.getSenders().map((sender) => {
      if (sender.track.kind == 'audio') {
        if (mediaStream.getAudioTracks().length > 0) {
          sender.replaceTrack(mediaStream.getAudioTracks()[0]);
        }
      }
      if (sender.track.kind == 'video') {
        if (mediaStream.getVideoTracks().length > 0) {
          sender.replaceTrack(mediaStream.getVideoTracks()[0]);
        }
      }
    });
  });
};

class SocketConnection {
  videoContainer = {};

  messages = [];

  settings;

  streaming = false;

  myPeer;

  socket;

  isSocketConnected = false;

  isPeerConnected = false;

  myId = '';

  constructor(settings) {
    this.settings = settings;
    this.myPeer = initializePeerConnection();
    this.socket = initializeSocketConnection();
    if (this.socket) this.isSocketConnected = true;
    if (this.myPeer) this.isPeerConnected = true;
    this.initSocketEvents();
    this.initPeerEvents();
  }

  initPeerEvents = () => {
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
      this.setNavigatorToStream();
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
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected --');
    });
    this.socket.on('error', (err) => {
      console.log('socket error --', err);
    });
    this.socket.on('new-broadcast-messsage', (data) => {
      this.message.push(data);
      this.settings.updateInstance('message', this.message);
      console.log(`${data.message.message} By ${data.userData.name}`);
    });
    this.socket.on('display-media', (data) => {
      if (data.value) checkAndAddClass(document.getElementById(data.userID), 'displayMedia');
      else checkAndAddClass(document.getElementById(data.userID), 'userMedia');
    });
    // this.socket.on('user-video-off', (data:UserVideoToggle) => {
    //     changeMediaView(data.id, data.status);
    // });
  };

  getVideoAudioStream = (video = true, audio = true) => navigator.mediaDevices.getUserMedia({
      audio,
      video: video
        ? {
            frameRate: 12,
            height: { ideal: 720, max: 1080, min: 480 },
            noiseSuppression: true,
            width: { ideal: 1280, max: 1920, min: 640 }
          }
        : false
    });

  setNavigatorToStream = () => {
    this.getVideoAudioStream()
      .then((stream) => {
        if (stream) {
          console.log('stream', stream);
          this.streaming = true;
          this.settings.updateInstance('streaming', true);
          this.createVideo({ id: this.myID, stream });
          this.setPeersListeners(stream);
          this.newUserConnection(stream);
        }
      })
      .catch((error) => console.log(error.name, error.message));
  };

  setPeersListeners = (stream) => {
    this.myPeer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (userVideoStream) => {
        this.createVideo({ id: call.metadata.id, stream: userVideoStream });
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
    if (!this.videoContainer[createObj.id]) {
      this.videoContainer[createObj.id] = {
        ...createObj
      };
      const roomContainer = document.getElementById('room-container');
      const videoContainer = document.createElement('div');
      const video = document.createElement('video');
      video.srcObject = this.videoContainer[createObj.id].stream;
      video.id = createObj.id;
      video.autoplay = true;
      if (this.myID === createObj.id) video.muted = true;
      videoContainer.appendChild(video);
      roomContainer.append(videoContainer);
    } else {
      const video = document.getElementById(createObj.id);
      if (video) video.srcObject = createObj.stream;
    }
  };

  newUserConnection = (stream) => {
    this.socket.on('new-user-connect', (userData) => {
      console.log('New user connected', userData);
      // eslint-disable-next-line
      alert(`New user connected \n${JSON.stringify(userData, null, 2)}`);
      const { userID } = userData;
      const call = this.myPeer.call(userID, stream, { metadata: { id: this.myID } });
      call.on('stream', (userVideoStream) => {
        this.createVideo({ id: userID, stream: userVideoStream, userData });
      });
      call.on('close', () => {
        console.log('closing new user', userID);
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
    const video = document.getElementById(id);
    if (video) video.remove();
  };

  getMyVideo = (id = this.myID) => document.getElementById(id);

  reInitializeStream = (video, audio, type = 'userMedia') => {
    const media =
      type === 'userMedia'
        ? this.getVideoAudioStream(video, audio)
        : navigator.mediaDevices.getDisplayMedia();
    return new Promise((resolve) => {
      media.then((stream) => {
        const myVideo = this.getMyVideo();
        if (type === 'displayMedia') {
          this.toggleVideoTrack({ audio, video });
          this.listenToEndStream(stream, { audio, video });
          this.socket.emit('display-media', true);
        }
        checkAndAddClass(myVideo, type);
        this.createVideo({ id: this.myID, stream });
        replaceStream(stream);
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

  toggleVideoTrack = (status) => {
    const myVideo = this.getMyVideo();
    if (myVideo && !status.video) {
      myVideo.srcObject?.getVideoTracks().forEach((track) => {
        if (track.kind === 'video') {
          !status.video && track.stop();
        }
      });
    } else if (myVideo) {
      this.reInitializeStream(status.video, status.audio);
    }
  };

  toggleAudioTrack = (status) => {
    const myVideo = this.getMyVideo();
    if (myVideo)
      myVideo.srcObject?.getAudioTracks().forEach((track) => {
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
    Object.values(peers).map((peer) => {
      peer.peerConnection?.getSenders().map((sender) => {
        if (sender.track.kind == 'audio') {
          if (mediaStream.getAudioTracks().length > 0) {
            sender.replaceTrack(mediaStream.getAudioTracks()[0]);
          }
        }
        if (sender.track.kind == 'video') {
          if (mediaStream.getVideoTracks().length > 0) {
            sender.replaceTrack(mediaStream.getVideoTracks()[0]);
          }
        }
      });
    });
  };
}

const changeMediaView = (userID, status) => {
  const userVideoDOM = document.getElementById(userID);
  if (status) {
    const clientPosition = userVideoDOM.getBoundingClientRect();
    const createdCanvas = document.createElement('SPAN');
    createdCanvas.className = userID;
    createdCanvas.style.position = 'absolute';
    createdCanvas.style.left = `${clientPosition.left}px`;
    createdCanvas.style.top = `${clientPosition.top}px`;
    // createdCanvas.style.width = `${userVideoDOM.videoWidth}px`;
    // createdCanvas.style.height = `${clientPosition.height}px`;
    createdCanvas.style.width = '100%';
    createdCanvas.style.height = '100%';
    createdCanvas.style.backgroundColor = 'green';
    userVideoDOM.parentElement.appendChild(createdCanvas);
  } else {
    const canvasElement = document.getElementsByClassName(userID);
    if (canvasElement[0]) canvasElement[0].remove();
  }
};

export function createSocketInstance(settings = {}) {
  socketInstance = new SocketConnection(settings);
  return socketInstance;
}
