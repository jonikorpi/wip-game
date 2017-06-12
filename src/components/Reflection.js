import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const Reflection = ({ points }) => {
  const path =
    points.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0];
      const yPoint = point[1];
      return `${path}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <path
      d={path}
      fill={styles.reflection}
      stroke={styles.reflection}
      strokeWidth={hex.roundingWidth}
      strokeLinejoin="round"
    />
  );
};

export default Reflection;
