//Constants
const path = window.location.pathname;

document.getElementById("error-display").classList.add("hidden");

//Variables
var ping = 0;
var error = document.getElementById("error");
var errordisplay = document.getElementById("error-display");
var streamer;

//Info
socket.on("info", function(error) {

  //If error, display. Otherwise, remove the error screen so the user can join the room
  if (error) {

    document.getElementById("error-display").classList.remove("hidden");
    document.getElementById("error").innerHTML = error;

  } else {
    //Remove verify screen
    document.getElementById("verify").remove();

    //User joined room, start streaming microphone/receiving audio
    newMedia(false, function() {

      //Once media is created, stream
      stream();
    });
  }

});

function join() {

  socket.emit("info", {"room" : path});
  
}

function stream() {

  //Initialize stream
  var audioStreamer = new ScarletsAudioStreamer(200); 
  
  audioStreamer.playStream();

  // Handling header reception
  socket.on('reqHeader', function(packet){
    //console.log("recieved header");
    audioStreamer.setBufferHeader(packet);
  });

  // Playing streamed media
  socket.on('stream', function(packet){
    console.log("Buffer received: " + packet[0].byteLength + "bytes");

    audioStreamer.realtimeBufferPlay(packet);
  });

  //Requesting header for room
  socket.emit("reqHeader", {"room" : path});
}

function newMedia(init, callback) {

  //Create media streamer
  var media = new ScarletsMediaPresenter({
    audio:{
      channelCount:1,
      echoCancellation: false
    },
  }, 200); 

  media.startRecording();

  media.onRecordingReady = function(packet){
    //console.log("Header size: " + packet.data.size + "bytes");

    //Send header packet
    socket.emit('header', {"packet" : packet, "room" : path});

    if (init) {
      media.stopRecording();
    }

    streamer = media;

    callback();
    return;
  }

  media.onBufferProcess = function(packet){
    console.log("Buffer sent: " + packet[0].size + "bytes");
    socket.emit('stream', {"packet" : packet, "room" : path});
  }
}

function mute() {
  if (streamer.recording) {

    //Stop streaming microphone
    document.getElementById("mute").innerHTML = "unmute";

    streamer.stopRecording();

  } else {

    //Start streaming microphone
    document.getElementById("mute").innerHTML = "mute";

    newMedia(false, function() {
      streamer.startRecording();
    });
  }
}