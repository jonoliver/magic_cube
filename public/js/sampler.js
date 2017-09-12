var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function play(){
  // Create an empty three-second stereo buffer at the sample rate of the AudioContext
  var myArrayBuffer = audioCtx.createBuffer(2, 10000, audioCtx.sampleRate);

  // Fill the buffer with white noise;
  // just random values between -1.0 and 1.0
  for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
    // This gives us the actual ArrayBuffer that contains the data
    var nowBuffering = myArrayBuffer.getChannelData(channel);
    for (var i = 0; i < myArrayBuffer.length; i++) {
      // Math.random() is in [0; 1.0]
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = 0.00001 * i;
    }
  }

  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  var source = audioCtx.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = myArrayBuffer;
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(audioCtx.destination);
  // start the source playing
  source.start();

}
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

function cloneAudioBuffer(buffer){
  const newBuffer = audioCtx.createBuffer(2, buffer.length, buffer.sampleRate);
  newBuffer.copyToChannel(buffer.getChannelData(0),0,0);
  newBuffer.copyToChannel(buffer.getChannelData(1),1,0);
  reverseAudioBuffer(newBuffer);
  console.log(newBuffer);
  return newBuffer;
}

function reverseAudioBuffer(buffer){
  Array.prototype.reverse.call( buffer.getChannelData(0) );
  Array.prototype.reverse.call( buffer.getChannelData(1) );
}
// setInterval(play, 1);
// var buffer;
fetch('revolution.mp3')
.then((response) => response.arrayBuffer())
.then((buffer) =>
audioCtx.decodeAudioData(buffer, function(decodedData) {
  // shuffle(decodedData.getChannelData(0))
  // shuffle(decodedData.getChannelData(1))
  console.log(decodedData);
  window.source = audioCtx.createBufferSource();
  // Array.prototype.reverse.call( decodedData.getChannelData(0) );
  // Array.prototype.reverse.call( decodedData.getChannelData(1) );
  window.buffer = decodedData;
  // window.buffer2 = cloneAudioBuffer(decodedData);
  source.buffer = decodedData;

  window.volume = audioCtx.createGain();
  source.connect(volume);
  volume .connect(audioCtx.destination);
  // source.connect(audioCtx.destination);
  // start the source playing
  source.loop = true;
  source.start();
}));
// console.log(b);
