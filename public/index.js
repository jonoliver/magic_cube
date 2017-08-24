// TODO: Scope these
let r,g,b;
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
  renderFromOrientationData(e);
  socket.emit('update', { alpha, beta, gamma });
});

// shared functionality
socket.on('tap', updateColorSelection);

document.addEventListener('click', () => {
  updateColorSelection();
  socket.emit('tap');
});

// shared functions
const proportion = (a,b,c) => a*b/c;
const valueFromBeta = (v) => proportion(v, 255, 180);
const valueFromGamma = (v) => proportion(v, 255, 90);
const valueFromAlpha = (v) => proportion(v, 255, 360);
const toHex = (num) => `0${num.toString(16)}`.slice(-2).toUpperCase();

const rgbFromOrientation = (alpha, beta, gamma) =>
  [
    Math.round(valueFromAlpha(Math.abs(alpha))),
    Math.round(valueFromBeta(Math.abs(beta))),
    Math.round(valueFromGamma(Math.abs(gamma)))
  ]

function renderFromOrientationData(data) {
  const { alpha, beta, gamma } = data;
  [r, g, b] = rgbFromOrientation(alpha, beta, gamma);
  updateSquares(alpha, beta, gamma);
  updateColor(alpha, beta, gamma);
}
// DOM stuff
const $body = document.querySelector('body');
const $result = document.querySelector('.result');

function updateColor(){
  $body.style.background = `rgb(${r}, ${g}, ${b})`;
}

function updateColorSelection(){
  $result.style.color = `rgb(${r}, ${g}, ${b})`;
  $result.innerText = "#" + toHex(r) + toHex(g) + toHex(b);
}

function updateSquares(alpha, beta, gamma){
  document.querySelector('.square1').style.transform = `rotate(${alpha * -1}deg)`;
  document.querySelector('.square2').style.transform = `rotate(${beta}deg)`;
  document.querySelector('.square3').style.transform = `rotate(${gamma}deg)`;
  document.querySelector('.cube').style.transform = `rotateX(${(beta - 70) * -1}deg) rotateY(${gamma}deg) rotateZ(${alpha * -1}deg`;
}
