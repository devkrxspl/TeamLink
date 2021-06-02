module.exports = class SocketEvent {

  constructor({
    name = null,
    description = null,
  }) {
    this.info = {
      "name" : name,
      "description" : description
    };
  }

  get info() {
    return this._info;
  }

  set info(info) {
    this._info = info;
  }

  invoke(...args) {
    console.log(`No invoke function specified for event ${this._info.name}`);
  }
}