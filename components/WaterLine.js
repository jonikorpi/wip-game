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
  const colors = visible ? styles : styles.faded;
  const waterLinePath =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint =
        point[0] + (hex.beachWidth + hex.waterLineWidth) * xModifiers[index];
      const yPoint =
        point[1] + (hex.beachWidth + hex.waterLineWidth) * yModifiers[index];
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  const wavePath =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint =
        point[0] + (hex.beachWidth + hex.waveOffset) * xModifiers[index];
      const yPoint =
        point[1] + (hex.beachWidth + hex.waveOffset) * yModifiers[index];
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  return (
    <g
      stroke={colors.wave}
      strokeWidth={hex.waterLineWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    >
      <path d={waterLinePath} />
      <path
        stroke={colors.wave}
        d={wavePath}
        strokeDasharray={dashArray}
        strokeDashoffset={seed * hex.waveGap}
      />
    </g>
  );
};

export default WaterLine;
