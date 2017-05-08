import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default ({ x, y, left, top, hexPoints }) => {
  const ridgePoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1] + hex.ridgeHeight}`;
  }, "");

  return (
    <polygon
      stroke={styles.rock}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
      fill={styles.rock}
      points={ridgePoints}
      transform={`translate(${left}, ${top})`}
    />
  );
};
