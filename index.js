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

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("It's alive!");
  response.end();
}).listen(3000);
