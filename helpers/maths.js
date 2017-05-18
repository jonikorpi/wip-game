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

  calculateTransform: (left, top, hex) => {
    return `
      translate(
        calc(
          ${left}
          * ${hex.renderingSize}
          * 1${hex.unit}
        ),
        calc(
          ${top}
          * ${hex.renderingSize}
          * 1${hex.unit}
        )
      )
    `;
  },
};
