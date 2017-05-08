import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const xModifiers = [-1, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1];

export default ({ x, y, left, top, hexPoints }) => {
  let seed = (x || 1) * (y || 2);

  const outerWaterLinePoints = hexPoints.reduce((result, point, index) => {
    const xPoint = point[0] + hex.outerWaterLineOffset * xModifiers[index];
    const yPoint =
      point[1] +
      hex.ridgeHeight +
      hex.outerWaterLineOffset * (index < 9 ? -1 : 1);
    return `${result} ${xPoint},${yPoint}`;
  }, "");

  return (
    <polygon
      stroke={styles.white}
      strokeWidth={hex.waterLineWidth}
      transform={`translate(${left}, ${top + hex.waterLineWidth})`}
      strokeLinejoin="round"
      strokeDasharray={`${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}`}
      strokeDashoffset={seed % 100}
      fill="none"
      points={outerWaterLinePoints}
    />
  );
};
