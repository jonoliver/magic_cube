// SHARED SETUP
const socket = io('$SOCKET_SERVER');
console.log(socket);
socket.on('connect', function(){  console.log('connected');});
socket.on('disconnect', function(){});

// DESKTOP ONLY
socket.on('update', renderFromOrientationData);

// MOBILE ONLY
// TODO: check for mobile device
window.addEventListener('deviceorientation', (e) => {
  const { alpha, beta, gamma } = e;
  socket.emit('update', { alpha, beta, gamma });
});

// shared functionality
socket.on('tap', updateColorSelection);

document.addEventListener('click', () => {
  socket.emit('tap');
});
