//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");
const room = require("../../../lib/socketroom.js");

//Main
module.exports = class DisconnectEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "DisconnectEvent",
      description : "Handles socket disconnections",
    });
  }

  invoke(socket) {

    var rooms = roomhandler.raw;

    for (var i in rooms) {

      //Check if room includes disconnected socket
      if (rooms[i].users.includes(socket)) {
        
        //Remove disconnected socket from room
        rooms[i].removeUser(socket);
        
        //If the room is now empty, delete the room
        if (rooms[i].users.length == 0) {

          delete rooms[i];

          break;
        }
      }
    }

    roomhandler.update(rooms);
  }
}