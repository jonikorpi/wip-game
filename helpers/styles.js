import chroma from "chroma-js";

const waterHue = 200;
const groundHue = waterHue - 180;

const base = {
  water: `hsl(${waterHue}, 0%, 41.4%)`,
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
  ...base,
  faded: {
    ...faded,
  },
};
