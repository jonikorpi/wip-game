import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default ({ x, y, left, top, hexPoints }) => {
  let seed = (x || 1) * (y || 2);

  const waterLinePoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1] + hex.ridgeHeight}`;
  }, "");

  return (
    <polygon
      stroke={styles.white}
      strokeWidth={hex.waterLineWidth + hex.roundingWidth}
      transform={`translate(${left}, ${top + hex.waterLineWidth})`}
      strokeLinejoin="round"
      strokeDasharray={`${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}, ${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}, ${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}, ${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}`}
      strokeDashoffset={seed % 100}
      fill="none"
      points={waterLinePoints}
    />
  );
};
