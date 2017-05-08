import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default ({ x, y, left, top, hexPoints }) => {
  const groundPoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1]}`;
  }, "");

  return (
    <polygon
      stroke={styles.black}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
      fill={styles.black}
      points={groundPoints}
      transform={`translate(${left}, ${top})`}
    />
  );
};
