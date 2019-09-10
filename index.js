var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected:'+socket.id);
  socket.on('disconnect',()=>{
      console.log(`${socket.id} has dosconnected`);
  });
  socket.on("chat message",(msg)=>{
    //   io.emit('chat message',msg);// original string
    socket.broadcast.emit('chat message', msg);// this is what i need
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});