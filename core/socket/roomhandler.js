//Variables
var rooms = [];

//Functions
function remove(id) {
  if (id in rooms) {
    delete rooms[id];
  }
}

function add(id, room) {
  rooms[id] = room;
}

function update(modified) {
  rooms = modified;
}

//Main
module.exports.raw = rooms;
module.exports.remove = remove;
module.exports.add = add;
module.exports.update = update;