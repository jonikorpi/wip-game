import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const multipliers = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0];

const Reflection = ({ points, visible }) => {
  const colors = visible ? styles : styles.faded;
  const path =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0];
      const yPoint =
        point[1] + hex.ridgeHeight + hex.ridgeHeight * multipliers[index];
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <path
      d={path}
      fill={colors.reflection}
      stroke={colors.reflection}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
    />
  );
};

export default Reflection;
