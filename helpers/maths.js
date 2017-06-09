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

  getViewBox: landscape => {
    return landscape
      ? `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`
      : `${-hex.height} ${-hex.width} ${hex.height * 3} ${hex.width * 3}`;
  },

  getPositionerStyle: (landscape, coordinates) => {
    const [pixelX, pixelY] = hex.pixelCoordinates(coordinates);
    const pixelCoordinates = landscape ? [pixelX, pixelY] : [-pixelY, pixelX];

    return {
      position: "absolute",
      left: landscape
        ? `${(styles.padding + pixelCoordinates[0] - hex.width) / styles.width * 100}%`
        : `${(styles.padding + pixelCoordinates[0] - hex.height) / styles.height * 100 + 75}%`,
      top: landscape
        ? `${(styles.padding + pixelCoordinates[1] - hex.height) / styles.height * 100}%`
        : `${(styles.padding + pixelCoordinates[1] - hex.width) / styles.width * 100}%`,
      width: landscape
        ? `${hex.width / styles.width * 300}%`
        : `${hex.height / styles.height * 300}%`,
      height: landscape
        ? `${hex.height / styles.height * 300}%`
        : `${hex.width / styles.width * 300}%`,
    };
  },
};
