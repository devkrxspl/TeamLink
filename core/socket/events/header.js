//Constants
const Event = require("../../structures/socketevent.js");

//Main
module.exports = class HeaderEvent extends Event {
  
  constructor() {
    super({
      name : "Prefix",
      description : "Sets the default prefix for a new guild",
    });
  }

  async invoke(data, socket) {
    
    const prefix = await prefixhandler.getPrefix(guild.id);
  }
}