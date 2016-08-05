var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var qModel = require('./q');
var q = null;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  
  socket.on('init', function(){
    if (q == null) {
      q = new qModel();
      q.init();
    }
    io.emit('updateQ', q.q);
  });
  
  socket.on('enqueue', function(name){
    q.enqueue(name);
    io.emit('updateQ', q.q);
  });

  socket.on('dequeue', function(){
  	q.dequeue();
    io.emit('updateQ', q.q);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});