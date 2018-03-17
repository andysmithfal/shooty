var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/game.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/static/game.html');
});

app.get('/control', function(req, res){
  res.sendFile(__dirname + '/static/control.html');
});

app.get('/fire', function(req, res){
  res.sendFile(__dirname + '/static/control.html');
});

http.listen(80, function(){
  console.log('listening on *:80');
});

io.on('connection', function(socket){
  socket.on('getroom', function(msg){
    room = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
    socket.join(room);
    console.log("sending "+room)
    // socket.broadcast.to(room).emit('room',room);
    socket.emit('room',room);
  });

  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('fire', function(msg){
    console.log(socket.rooms);
    console.log(msg);
    socket.broadcast.to(msg).emit('fire','');
  });
  socket.on('test', function(msg){
    console.log(socket.rooms);

    // io.emit('fire','');
  });
  // socket.on('room', function(room) {
  //   socket.join(room);
  // });
  
});