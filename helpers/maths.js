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
        ${-hex.width / 2 * hex.renderingSize + hex.unit},
        ${-hex.height / 2 * hex.renderingSize + hex.unit}
      )
      translate(
        calc(
          (
            (${left * hex.renderingSize})
            - ((var(--playerX) * ${hex.width * hex.renderingSize}))
          )
          * var(--zoom)
          * 1${hex.unit}
        ),
        calc(
          (
            (${top * hex.renderingSize})
            - ((var(--playerY) * ${hex.width * hex.renderingSize}))
          )
          * var(--zoom)
          * 1${hex.unit}
        )
      )
      scale(var(--zoom))
    `;
  },
};
