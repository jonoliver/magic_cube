const HOST = process.env.HOST || 'http://192.168.0.6';
const PORT = process.env.PORT || 3000;
const ROOTPATH = `http://${HOST}:${PORT}`;

// Create app server
const Koa = require('koa');
const app = new Koa();

// Configure server //

// Reload connected browsers when public files change
app.use(require('koa-browser-sync')({
  init: true,
  files: 'public/*',
  notify: false
}));

// Text transformations for static files
// $SOCKET_SERVER is the host/port that socket io client is running
const replace = require('stream-replace');
app.use(async (ctx, next) => {
  await next();
  if (!ctx.body) { return; }
  if (ctx.body.path.endsWith('.html') || ctx.body.path.endsWith('.js')) {
    ctx.body = ctx.body.pipe(replace(/\$SOCKET_SERVER/g, ROOTPATH));
  }
});

// serve static files from public
app.use(require('koa-static')('public/', {defer: true}));

// configure socket connection
const IO = require( 'koa-socket' );
const io = new IO();
io.attach( app );
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

// Start 'er up!
app.listen(PORT);
console.log(`Listening on ${ROOTPATH}`);
