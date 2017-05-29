import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const xModifiers = [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1, -1];
const yModifiers = [
  -0.75,
  -0.75,
  -0.75,
  -0.75,
  -0.75,
  -0.75,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  -0.75,
  -0.75,
  -0.75,
];

const Beach = ({ points }) => {
  const path = points.reduce((path, location) => {
    return (
      path +
      location.reduce((result, point, index) => {
        const command = index === 0 ? "M" : "L";
        const xPoint = point[0] + hex.beachWidth * xModifiers[index];
        const yPoint = point[1] + hex.beachWidth * yModifiers[index];
        return `${result}${command}${xPoint},${yPoint}`;
      }, "") +
      "Z"
    );
  }, "");

  return (
    <path
      d={path}
      fill={styles.rock}
      stroke={styles.rock}
      strokeWidth={hex.beachWidth * 0.25}
      strokeLinejoin="round"
    />
  );
};

export default Beach;
