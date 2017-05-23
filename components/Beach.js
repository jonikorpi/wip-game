import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const xModifiers = [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1, -1];
const yModifiers = [
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  -0.5,
  -0.5,
  -0.5,
];

const Beach = ({ points, visible }) => {
  const colors = visible ? styles : styles;
  const path =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0] + hex.beachWidth * xModifiers[index];
      const yPoint = point[1] + hex.beachWidth * yModifiers[index];
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <path
      d={path}
      fill={colors.rock}
      stroke={colors.rock}
      strokeWidth={hex.beachWidth * 0.25}
      strokeLinejoin="round"
    />
  );
};

export default Beach;
