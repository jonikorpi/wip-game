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
const dashArray = `${hex.waveLength}, ${hex.waveGap}`;

const WaterLine = ({ points, seed, visible }) => {
  const waterLinePath =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0] + hex.waterLineOffset * xModifiers[index];
      const yPoint =
        point[1] +
        hex.ridgeHeight +
        hex.waterLineOffset * yModifiers[index] +
        hex.waterLineWidth;
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  const wavePath =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint = point[0] + hex.waveOffset * xModifiers[index];
      const yPoint =
        point[1] +
        hex.ridgeHeight +
        hex.waveOffset * yModifiers[index] +
        hex.waterLineWidth;
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <g
      stroke={styles.wave}
      strokeWidth={hex.waterLineWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    >
      <path d={waterLinePath} />
      <path
        stroke={styles.wave}
        d={wavePath}
        strokeDasharray={dashArray}
        strokeDashoffset={seed * hex.waveGap}
      />
    </g>
  );
};

export default WaterLine;
