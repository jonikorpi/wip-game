import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

const xModifiers = [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1, -1];
const yModifiers = [
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  -1,
  -1,
  -1,
];

const Ground = ({ points }) => {
  const path = points.reduce((path, location) => {
    return (
      path +
      location.reduce((result, point, index) => {
        const locationSeed = maths.getSeed([point[0], point[1]]);

        const command = index === 0 ? "M" : "L";
        const xPoint =
          point[0] -
          maths.random(hex.beachWidth * 0.5, locationSeed) * xModifiers[index];
        const yPoint =
          point[1] -
          maths.random(hex.beachWidth * 0.5, locationSeed) * yModifiers[index];

        return `${result}${command}${xPoint},${yPoint}`;
      }, "") +
      "Z"
    );
  }, "");

  return (
    <path
      d={path}
      fill={styles.black}
      stroke={styles.black}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
    />
  );
};

export default Ground;
