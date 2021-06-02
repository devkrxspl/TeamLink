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

    //console.log(rooms);

    if (data.room in rooms) {
      rooms[data.room].stream(socket, data.packet);
    }
  }
}