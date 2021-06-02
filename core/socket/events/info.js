//Constants
const SocketEvent = require("../../../structures/socketevent.js");
const roomhandler = require("../roomhandler.js");

//Main
module.exports = class InfoEvent extends SocketEvent {
  
  constructor() {
    super({
      name : "Prefix",
      description : "Sets the default prefix for a new guild",
    });
  }

  async invoke(data, socket) {

    var rooms = roomhandler.raw;

    if (data.room in rooms) {
      rooms[data.room].updateHeader(data.packet);
    }

    roomhandler.update(rooms);
  }
}