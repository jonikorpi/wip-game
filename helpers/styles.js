import chroma from "chroma-js";

const waterHue = 205;
const groundHue = waterHue - 360 * Math.sqrt(2);

const base = {
  map: `hsl(${groundHue}, 0%, 50%)`,
  water: `hsl(${waterHue}, 0%, 38.2%)`,
  black: `hsl(${groundHue}, 0%, 0%)`,
  white: `white`,
  rock: `hsl(${groundHue}, 0%, 50%)`,
  wave: `hsl(${waterHue}, 0%, 85.4%)`,
  reflection: `hsl(${waterHue}, 0%, 33.333%)`,
};

const faded = Object.keys(base).reduce((faded, color) => {
  faded[color] = chroma.mix(base[color], base.water, 0.5);
  return faded;
}, {});

export default {
  maxHeight: 0.764,
  minHeight: 0.382,
  // maxHeight: 1,
  perspective: 10,
  padding: 0.236,

  ...base,
  faded: {
    ...faded,
  },
};
