var io = require('socket.io')();
console.log('running');
io.on('connection', function(socket){
  console.log('connected');
  socket.on('update', function(data){
    socket.broadcast.to('room').emit('update', data)
  });
  socket.on('tap', function(data){
    socket.broadcast.to('room').emit('tap', data)
  });
  socket.join('room');
  socket.on('disconnect', function(){});

});
io.listen(3000);
