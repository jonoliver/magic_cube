window.view = (() => {
  let r,g,b;
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

  const $body = document.querySelector('body');
  const $result = document.querySelector('.result');

  function updateBackgroundColor(data){
    const { alpha, beta, gamma } = data;
    [r, g, b] = rgbFromOrientation(alpha, beta, gamma);
    $body.style.background = `rgb(${r}, ${g}, ${b})`;
  }

  function updateColorSelection(){
    $result.style.color = `rgb(${r}, ${g}, ${b})`;
    $result.innerText = "#" + toHex(r) + toHex(g) + toHex(b);
  }

  function updateCube(data){
    const { alpha, beta, gamma } = data;
    document.querySelector('.cube').style.transform = `rotateX(${(beta - 70) * -1}deg) rotateY(${gamma}deg) rotateZ(${alpha * -1}deg`;
  }

  return {
    updateCube: updateCube,
    updateBackgroundColor: updateBackgroundColor,
    updateColorSelection, updateColorSelection,
  }
})();
