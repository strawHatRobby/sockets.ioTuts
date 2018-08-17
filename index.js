var express = require('express');

var app = express();

var socket = require('socket.io')

var server = app.listen(4000, function(){
    console.log("Listening to port 4000 at localohost");
});

//static files

app.use(express.static('public'));

// Socket Setup

var io = socket(server);

io.on('connection', function(socket){

  console.log("made socket connection to", socket.id);
  // Chat Events
  //listening for any messages
  socket.on('chatMessage', function(data){
    io.sockets.emit('chatMessage', data);
  });

//listening whether user is typing or not
  socket.on('chatIsTyping', function(data){
    console.log("Broadcasting");
    socket.broadcast.emit('chatIsTyping', data);
  });
});
