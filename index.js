var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  
  socket.on('enqueue', function(name){
    io.emit('enqueue', name, Math.floor((Math.random() * 1000) + 1));
  });

  socket.on('dequeue', function(){
  	io.emit('dequeue');
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
