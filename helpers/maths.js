import hex from "../helpers/hex.js";

const calculateTransform = (offset, variableName) => {
  return `calc(((${offset} - var(--${variableName})) * ${hex.renderingSize}) * 1${hex.unit})`;
};

const getTransform = (x, y) => {
  return `translate3d(${calculateTransform(x, "playerX")}, ${calculateTransform(-y, "playerY")}, 0)`;
};

// const getTransform = (x, y, z) => {
//   const transform = `
//     translate(${calculateTransform(x, "playerX")}, ${calculateTransform(y, "playerY")})
//     scale(var(--zoom))
//   `;
//   return {
//     WebkitTransform: transform,
//     transform: transform,
//     zIndex: z,
//   };
// };

export default {
  random: (number = 1, seed = 1) => {
    const rand = Math.sin(seed) * 10000;
    return Math.abs((rand - Math.floor(rand)) * number);
  },

  toIsometric: (x, y) => {
    return [x + y, y - x / 2];
  },

  fromIsometric: (isoX, isoY) => {
    return [(isoX - isoY) / 1.5, isoX / 3.0 + isoY / 1.5];
  },

  getSeed: coordinates => {
    return Math.abs(
      (coordinates[0] || 123) * 13 * ((coordinates[1] || 456) * 53)
    );
  },

  // calculateTransform: calculateTransform,
  getTransform: getTransform,
};
