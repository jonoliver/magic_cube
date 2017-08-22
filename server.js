var replace = require('stream-replace');
const Koa = require('koa');
const app = new Koa();

const HOST = process.env.HOST || 'http://192.168.0.6';
const PORT = process.env.PORT || 3000;
const ROOTPATH = `http://${HOST}:${PORT}`;

app.use(require('koa-browser-sync')({
  init: true,
  files: '*',
  notify: false
}));

app.use(async (ctx, next) => {
  await next();
  if (!ctx.body) { return; }
  ctx.body = ctx.body.pipe(replace(/\$SOCKET_SERVER/g, ROOTPATH));
});

app.use(require('koa-static')('.', {defer: true}));

const IO = require( 'koa-socket' )
const io = new IO()
io.attach( app )
app._io.on( 'connection', socket => {
  console.log('connected');
  socket.on('update', function(data){
    socket.broadcast.to('room').emit('update', data)
  });
  socket.on('tap', function(data){
    socket.broadcast.to('room').emit('tap', data)
  });
  socket.join('room');
  socket.on('disconnect', function(){});
})

app.listen(PORT);
console.log(`Listening on ${ROOTPATH}`);
