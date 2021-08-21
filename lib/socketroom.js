module.exports = class SocketRoom {

  constructor(id, creatorsocket, limit) {
    
    this._owner = creatorsocket;
    this._users = [creatorsocket];
    this._limit = limit;
    this._header = null;

  }

  addUser(socket) {

    this._users.push(socket);
  }

  removeUser(socket) {
    if (this._users.includes(socket)) {

      this._users.splice(this._users.indexOf(socket), 1);
    }
  }

  stream(sender, packet) {
    const users = this._users;

    for (var i in users) {

      if (users[i].id !== sender.id) {
        users[i].emit("stream", packet);
      }
    }
  }

  includesUser(socket) {

    return this._users.includes(socket);
  }

  updateHeader(header) {
    this._header = header;
  }

  get header() {
    return this._header;
  }

  get owner() {
    return this._owner;
  }

  get users() {
    return this._users;
  }
}