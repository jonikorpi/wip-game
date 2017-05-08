import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default ({ x, y, left, top, hexPoints }) => {
  const reflectionPoints = hexPoints.reduce((result, point, index) => {
    return `${result} ${point[0]},${point[1] + hex.ridgeHeight + hex.ridgeHeight * (index < 9 ? 0 : 1.5)}`;
  }, "");

  return (
    <polygon
      stroke={styles.reflection}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
      fill={styles.reflection}
      points={reflectionPoints}
      transform={`translate(${left}, ${top})`}
    />
  );
};
