import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const Ridge = ({ points, visible }) => {
  const path =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0];
      const yPoint = point[1] + hex.ridgeHeight;
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <path
      d={path}
      fill={styles.rock}
      stroke={styles.rock}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
    />
  );
};

export default Ridge;
