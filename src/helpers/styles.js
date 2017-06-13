import hex from "../helpers/hex";

const waterHue = 205;
const groundHue = 360 % Math.floor(waterHue - 360 * Math.sqrt(2));

const base = {
  map: `hsl(${groundHue}, 0%, 50%)`,
  water: `hsl(${waterHue}, 0%, 38%)`,
  black: `hsl(${groundHue}, 0%, 0%)`,
  white: `white`,
  rock: `hsl(${groundHue}, 0%, 50%)`,
  wave: `hsl(${waterHue}, 0%, 85%)`,
  reflection: `hsl(${waterHue}, 0%, 30%)`,
};

// const faded = Object.keys(base).reduce((faded, color) => {
//   faded[color] = chroma.mix(base[color], base.water, 0.5);
//   return faded;
// }, {});

let styles = {
  perspective: 12,

  padding: 0.5 * hex.size,

  ...base,
};

styles.width = 2 * styles.padding + hex.width * (hex.perRegionX + 0.5);
styles.height =
  2 * styles.padding + hex.height * (hex.perRegionY * 3 / 4 + 1 / 4);

export default styles;
