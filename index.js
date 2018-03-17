var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//serve up static pages
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

//handle websocket connections
io.on('connection', function(socket){
  console.log('a user connected');

  //client requests a room: 
  socket.on('getroom', function(msg){
    //generate a room code
    room = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
    //place user in that room
    socket.join(room);
    console.log("sending "+room)
    //send the room code back to the client
    socket.emit('room',room);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //handle incoming fire event
  //the event contains the room code
  socket.on('fire', function(room){
    //send the fire event to the room specified
    socket.broadcast.to(room).emit('fire','');
  }); 
});