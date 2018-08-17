// io is accessed form index.js whch is loaded when running hte server
var socket = io.connect("http://localhost:4000");

//DOM Query
var message = document.getElementById('message')
var send = document.getElementById('send')
var handle = document.getElementById('handle')
var output = document.getElementById('output')
var chatWindow = document.getElementById('chat-window')
var feedback = document.getElementById('feedback')



//Emit Events
message.addEventListener('keypress', function(){
  socket.emit('chatIsTyping', handle.value);
});

send.addEventListener('click', function(){
  socket.emit('chatMessage', {
    message: message.value,
    handle: handle.value
  });
});

socket.on('chatIsTyping', function(data){
  feedback.innerHTML += '<p> <em>' + data + 'is typing.....</em></p>';
  setTimeout(function(){
    feedback.innerHTML = "";
  },1000);
});

// Listen for events
socket.on('chatMessage', function(data){
  output.innerHTML += '<p> <strong>'+data.handle +':</strong> ' + data.message + '</p>';
});
