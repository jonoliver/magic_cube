window.sampler = (() => {
  const sample = 'valz.mp3';
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createBufferSource();
  const volume = audioCtx.createGain();

  fetch(sample)
  .then((response) => response.arrayBuffer())
  .then((buffer) =>
    audioCtx.decodeAudioData(buffer, function(decodedData) {
      source.buffer = decodedData;
      source.connect(volume);
      volume.connect(audioCtx.destination);
      source.loop = true;
      source.start();
    }
  ));

  const update = (data) => {
    const { alpha, beta, gamma } = data;
    if (source) {
      source.playbackRate.value = constrain((gamma * 0.1), -1.2, 1);
      volume.gain.value = constrain(beta * 0.5, 0, 1);
    }
  }

  function constrain(number, low, high){
    if (number < low) return low;
    if (number > high) return high;
    return number;
  }

  return {
    update: update,
  }
})();
