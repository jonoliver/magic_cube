var io = require('socket.io')();
console.log('running');
io.on('connection', function(socket){
  console.log('connected');
  socket.on('event', function(data){
    socket.broadcast.to('room').emit('update', data)
  });
  socket.join('room');
  socket.on('disconnect', function(){});

});
io.listen(3000);
