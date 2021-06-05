//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");
const room = require("../../../lib/socketroom.js");

//Main
module.exports = class PingEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "PingEvent",
      description : "Returns ping from client",
    });
  }

  invoke(socket, data) {
    socket.emit("ping", "");
  }
}