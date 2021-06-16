//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");
const room = require("../../../lib/socketroom.js");

//Main
module.exports = class HeaderEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "HeaderEvent",
      description : "Sets header for room",
    });
  }

  invoke(socket, data) {

    var rooms = roomhandler.raw;

    if (data.room in rooms) {
      
      //Check if user is in room, if true, update header
      if (rooms[data.room].includesUser(socket)) {
        rooms[data.room].updateHeader(data.packet);
      }
    }

    roomhandler.update(rooms);
  }
}