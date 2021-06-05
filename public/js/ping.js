//Ping

var timer = new interval(1000, function(){

  if (focused) {
    var start = new Date().getTime();

    socket.emit("ping", "");

    socket.on("ping", function() {

      socket.off("ping");

      var end = new Date().getTime();
      
      ping = end - start;

      console.log(ping);
    });
  }
})

timer.run();