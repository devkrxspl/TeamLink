//Constants
const express = require("express");
const path = require("path");
const http = require("http");

const root = path.resolve(path.dirname(""));
const room = require(`${root}/lib/socketroom.js`);

//Variables
var rooms = {};

//Roots
const publicroot = root + "/public";
const htmlroot = publicroot + "/html";

//Functions
function createRoom(id, socket) {
  rooms[id] = {
    header : undefined,
    users : [socket]
  };
}

//App Setup
const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(publicroot));

app.all("/", function(req, res) {
  res.sendFile(htmlroot + "/index.html");
});

//Routing calls
app.get("/call/:path", function(req, res) {

  res.sendFile(htmlroot + "/call.html");
});

//404
app.get("/:path", function(req, res) {
  res.sendFile(htmlroot + "/404.html");
});

//IO
io.sockets.on("connection", function(socket) {

  //Stream handling
  socket.on("header", function(data) {

    //If room exists, update header
    if (data.room in rooms) {
      rooms[data.room].updateHeader(data.packet);
    }
  });

  socket.on("reqHeader", function(data) {

    //Send header
    if (data.room in rooms) {
      socket.emit("reqHeader", rooms[data.room].header);
    }
  });

  socket.on("stream", function(data) {

    //If room exists, stream to all users
    if (data.room in rooms) {
      rooms[data.room].stream(socket, data.packet);
    }
  });

  //Socket 
  socket.on("info", function(data) {
    
    //Check if room exists
    if (data.room in rooms) {

      //Room exists, join room
      rooms[data.room].addUser(socket);

    } else {

      //Room doesn't exist, create room
      rooms[data.room] = new room(data.room, socket);
    }
  });

  //Disconnect
  socket.on("disconnect", function() {

    //Loop through all rooms
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
  });
});

server.listen(3001);
console.log();