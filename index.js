//Constants
const express = require("express");
const path = require("path");
const http = require("http");
const root = path.resolve(path.dirname(""));

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

 // if (req.path in rooms) {
    res.sendFile(htmlroot + "/call.html");
  //} else {
 //   res.sendFile(htmlroot + "/404.html");
 // }
});

//404
app.get("/:path", function(req, res) {
  res.sendFile(htmlroot + "/404.html");
});

//IO
io.sockets.on("connection", function(socket) {

  //Stream handling
  socket.on("header", function(data) {

    if (data.room in rooms) {
      rooms[data.room].header = data.packet;
    }
  });

  socket.on("reqHeader", function(data) {
    //Send header
    if (data.room in rooms) {
      socket.emit("reqHeader", rooms[data.room].header)
    }
  });

  socket.on("stream", function(data) {

    //Locate room and send packets to all users in that room
    if (data.room in rooms) {
      for (var i in rooms[data.room].users) {

        if (rooms[data.room].users[i].id !== socket.id) {
          rooms[data.room].users[i].emit("stream", data.packet);
        }
      }
    }
  });

  //Socket 
  socket.on("info", function(data) {
    
    //Check if room exists
    if (data.room in rooms) {

      //Room exists, join room
      rooms[data.room].users.push(socket);
    } else {

      //Room doesn't exist, create room
      createRoom(data.room, socket);
    }
  });

  //Disconnect
  socket.on("disconnect", function() {

    for (var i in rooms) {

      if (rooms[i].users.includes(socket)) {

        rooms[i].users.splice(rooms[i].users.indexOf(socket));
        
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