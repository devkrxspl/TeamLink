//Constants
const express = require("express");
const path = require("path");
const http = require("http");

const root = path.resolve(path.dirname(""));
const room = require(`${root}/lib/socketroom.js`);

//
const header = new (require(`${root}/core/socket/events/header.js`))();
const stream = new (require(`${root}/core/socket/events/stream.js`))();
const reqheader = new (require(`${root}/core/socket/events/reqHeader.js`))();
const info = new (require(`${root}/core/socket/events/info.js`))();

//Variables
var rooms = {};

//Roots
const publicroot = root + "/public";
const htmlroot = publicroot + "/html";

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
    header.invoke(data, socket);
  });

  socket.on("reqHeader", function(data) {
    reqheader.invoke(data, socket);
  });

  socket.on("stream", function(data) {
    stream.invoke(data, socket);
  });

  //Socket 
  socket.on("info", function(data) {
    info.invoke(data, socket);
  });

  //Disconnect
  socket.on("disconnect", function() {

  });
});


server.listen(3001);
console.log();