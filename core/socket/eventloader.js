//Constants
const path = require("path");
const root = path.resolve(path.dirname(""));

const header = new (require(`${root}/core/socket/events/header.js`))();
const stream = new (require(`${root}/core/socket/events/stream.js`))();
const reqHeader = new (require(`${root}/core/socket/events/reqHeader.js`))();
const info = new (require(`${root}/core/socket/events/info.js`))();
const disconnect = new (require(`${root}/core/socket/events/disconnect.js`))();

const events = {
  header,
  stream,
  info,
  reqHeader,
  disconnect,
}

//Main
module.exports.events = events;