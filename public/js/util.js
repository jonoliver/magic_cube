window.Util = (function() {
  function constrain(number, low, high){
    if (number < low) return low;
    if (number > high) return high;
    return number;
  }

  const constrainedRateFromValue = (input, inputLimits, outputLimits) => {
    const { constrain } = window.Util;
    const [inputLow, inputHigh] = inputLimits;
    const [outputLow, outputHigh] = outputLimits;
    const isPos = (input > 0);
    const value = constrain(input, inputLow, inputHigh);
    const inputLimit = isPos ? inputHigh : inputLow;
    const outputLimit = isPos ? outputHigh : outputLow;
    return value * outputLimit / inputLimit;
  }

  return {
    constrain,
    constrainedRateFromValue,
  }
}());
