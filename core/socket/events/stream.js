//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");
const room = require("../../../lib/socketroom.js");

//Main
module.exports = class StreamEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "StreamEvent",
      description : "Streams packets to sockets in room",
    });
  }

  invoke(socket, data) {

    var rooms = roomhandler.raw;

    if (data.room in rooms) {
      
      //Making sure user is in room before streaming packets
      if (rooms[data.room].includesUser(socket)) {
        rooms[data.room].stream(socket, data.packet);
      }
    }
  }
}