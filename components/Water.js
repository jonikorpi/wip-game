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

const Water = ({ points, visible }) => {
  const colors = visible ? styles : styles.faded;
  const waterRadius = hex.waveOffset;
  const path =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0] + waterRadius * xModifiers[index];
      const yPoint =
        point[1] + hex.ridgeHeight + waterRadius * yModifiers[index];
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <path
      d={path}
      stroke={colors.water}
      fill={colors.water}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
    />
  );
};

export default Water;
