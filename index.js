//Constants
const express = require("express");
const path = require("path");
const http = require("http");

const root = path.resolve(path.dirname(""));
const room = require(`${root}/lib/socketroom.js`);
const eventloader = require(`${root}/core/socket/eventloader.js`);

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

  const events = eventloader.events;

  for (var k in events) {
    const temp = k;

    socket.on(temp, function(...args) {
      events[temp].invoke(...args, socket);
    });
  }
});


server.listen(3001);
console.log();