//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");
const room = require("../../../lib/socketroom.js");

//Main
module.exports = class InfoEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "InfoEvent",
      description : "Manages new socket connections",
    });
  }

  invoke(socket, data) {

    var rooms = roomhandler.raw;

    if (data.room in rooms) {

      //Room exists, join room
      rooms[data.room].addUser(socket);

    } else {

      //Room doesn't exist, create room
      rooms[data.room] = new room(data.room, socket);
    }

    roomhandler.update(rooms);
  }
}