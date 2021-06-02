//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");

//Main
module.exports = class StreamEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "Prefix",
      description : "Sets the default prefix for a new guild",
    });
  }

  async invoke(data, socket) {

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