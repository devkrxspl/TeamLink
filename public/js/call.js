//Constants
const socket = io();
const path = window.location.pathname;

//Main
socket.emit("info", {"room" : path});

//Stream Handling
var streamer = newMedia(true);

streamer.startRecording();

function join() {

  document.getElementById("verify").remove();

  //User joined room, start streaming microphone/receiving audio
  streamer = newMedia(false);
  streamer.startRecording();

  stream();
}

function stream() {

  //Initialize stream
  var audioStreamer = new ScarletsAudioStreamer(200); 
  
  audioStreamer.playStream();

  socket.on('reqHeader', function(packet){
    console.log("recieved header");
    audioStreamer.setBufferHeader(packet);
  });

  socket.on('stream', function(packet){
    console.log("Buffer received: " + packet[0].byteLength + "bytes");

    audioStreamer.realtimeBufferPlay(packet);
  });

  //Requesting header for room
  socket.emit("reqHeader", {"room" : path});
}

function newMedia(init) {

  //Create media streamer
  var media = new ScarletsMediaPresenter({
    audio:{
      channelCount:1,
      echoCancellation: false
    },
  }, 200); 

  media.onRecordingReady = function(packet){
    console.log("Header size: " + packet.data.size + "bytes");

    //Send header packet
    socket.emit('header', {"packet" : packet, "room" : path});

    if (init) {
      media.stopRecording();
    }
  }

  media.onBufferProcess = function(packet){
    console.log("Buffer sent: " + packet[0].size + "bytes");
    socket.emit('stream', {"packet" : packet, "room" : path});
  }

  return media;
}

function mute() {
  if (streamer.recording) {

    //Stop streaming microphone
    document.getElementById("mute").innerHTML = "unmute";

    streamer.stopRecording();

  } else {

    //Start streaming microphone
    document.getElementById("mute").innerHTML = "mute";

    streamer = newMedia(false);
    streamer.startRecording();
  }
}