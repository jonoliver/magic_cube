var muted = false;
var volume = 0;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.type = "sin";
oscillator.frequency.value = 220;
oscillator.start();

// document.addEventListener("mousemove", updateTone);
// document.addEventListener("mousemove", updateVisual);

function updateTone(e) {
  freq = e.pageX;
  volume = e.pageY;
  if (muted) return;
  oscillator.frequency.value = freq;
  gainNode.gain.value = volume;
}

// function updatePage(alpha, beta, gamma) {
//   freq = beta + 200;
//   volume = gamma;
//   if (muted) return;
//   oscillator.frequency.value = freq;
//   // detuneVal = gamma*5;
//   // gainNode.gain.value = volume;
// }


var vibratoRate = 75;
var vibratoInterval = setInterval(vibrato, vibratoRate);

var detuneVal = 3;
var detuneMultiplier = 10;

function vibrato() {
  detuneMultiplier = detuneMultiplier * -1;
  oscillator.detune.value = detuneVal * detuneMultiplier;
}

document.onkeydown = handleKey;
// $("#volume").click(mute);

function handleKey(e) {
  e.preventDefault();
  switch (e.key) {
    case " ":
    mute();
    case "ArrowDown":
    if (detuneVal > 0) detuneVal--;
    console.log(detuneVal);
    break;
    case "ArrowUp":
    detuneVal++;
    console.log(detuneVal);
    break;
  }
}

function mute() {
  muted = !muted;
  if (muted) {
    gainNode.gain.value = 0;
    // $("#volume").removeClass("fa-volume-up").addClass("fa-volume-off");
  } else {
    gainNode.gain.value = volume;
    // $("#volume").removeClass("fa-volume-off").addClass("fa-volume-up");
  }
}
function updateVisual(e) {
  pointer = $('<div class="tracer"></div>');

  $(document.body).append(pointer);
  pointer
    .css({
      position: "absolute",
      top: e.pageY,
      left: e.pageX,
      width: 10,
      height: 10,
      borderRadius: 10
    })
    .animate({ width: 20, height: 20 })
    .fadeOut(400, function() {
      $(this).remove();
    });
}
mute();


// var wad = new Wad({
// source : 'sine',
// env: {
// hold: 1,
// attack: 0,
// sustain: 0,
// release: 0
// },
// tuna   : {
// Overdrive : {
// outputGain: 0.5,         //0 to 1+
// drive: 0.7,              //0 to 1
// curveAmount: 1,          //0 to 1
// algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
// bypass: 0
// },
// Chorus : {
// intensity: 0.3,  //0 to 1
// rate: 4,         //0.001 to 8
// stereoPhase: 0,  //0 to 180
// bypass: 0
// },
// Delay : {
// feedback: 0.45,    //0 to 1+
// delayTime: 150,    //1 to 10000 milliseconds
// wetLevel: 0.25,    //0 to 1+
// dryLevel: 1,       //0 to 1+
// cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
// bypass: 0
// }
// }
// });
// // A, C, D, E, G
// const pitches = [220, 261.63, 293.66, 329.63, 392];
// const play = (p, i) => wad.play({ pitch: p, wait: 0 });
// pitches.forEach((p, i) => setTimeout(() => play(p), i*2000));
