window.sampler = (() => {
  // const sample = 'valz.mp3';
  const sample = 'revolution.mp3';

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createBufferSource();
  const volume = audioCtx.createGain();

  const { constrain, constrainedRateFromValue } = window.Util;

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
      // const constrainedFactor = constrainedRateFromValue(gamma, [-12, 10], [-1.2, 1]);
      source.playbackRate.value = constrain((gamma * 0.1), -1.2, 1);
      volume.gain.value = constrain(beta * 0.5, 0, 1);
    }
  }

  return { update }
})();
