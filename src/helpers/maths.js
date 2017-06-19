import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

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

  getViewBox: () => {
    return `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`;
  },

  getPositionStyle: coordinates => {
    const [pixelX, pixelY] = hex.pixelCoordinates(coordinates);
    const pixelCoordinates = [pixelX, pixelY];

    return {
      position: "absolute",
      left: `${(styles.padding + pixelCoordinates[0] - hex.width) /
        styles.width *
        100}%`,
      top: `${(styles.padding + pixelCoordinates[1] - hex.height) /
        styles.height *
        100}%`,
      width: `${hex.width / styles.width * 300}%`,
      height: `${hex.height / styles.height * 300}%`,
    };
  },

  getTransformStyle: coordinates => {
    const [pixelX, pixelY] = hex.pixelCoordinates(coordinates);
    const pixelCoordinates = [pixelX, pixelY];
    const transform = `translate3d(
      ${pixelCoordinates[0] / hex.width * 100 / 3 - 25}%,
      ${pixelCoordinates[1] / hex.height * 100 / 3 - 25}%,
      0
    )`;

    return {
      position: "absolute",
      left: "0%",
      top: "0%",
      width: `${hex.width / styles.width * 300}%`,
      height: `${hex.height / styles.height * 300}%`,
      WebkitTransform: transform,
      transform: transform,
    };
  },
};
