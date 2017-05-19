import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const xModifiers = [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1, -1];
const yModifiers = [
  -0.414,
  -0.414,
  -0.414,
  -0.414,
  -0.414,
  -0.414,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  -0.414,
  -0.414,
  -0.414,
];

const WaterLine = ({ points, seed, visible }) => {
  const colors = visible ? styles : styles.faded;

  const waterLinePath =
    points.reduce((result, point, index) => {
      const command = index === 0 ? "M" : "L";
      const xPoint =
        point[0] + (hex.beachWidth + hex.waterLineOffset) * xModifiers[index];
      const yPoint =
        point[1] + (hex.beachWidth + hex.waterLineOffset) * yModifiers[index];
      return `${result}${command}${xPoint},${yPoint}`;
    }, "") + "Z";

  // const wavePath =
  //   points.reduce((result, point, index) => {
  //     const command = index === 0 ? "M" : "L";
  //     const xPoint =
  //       point[0] + (hex.beachWidth + hex.waveOffset) * xModifiers[index];
  //     const yPoint =
  //       point[1] + (hex.beachWidth + hex.waveOffset) * yModifiers[index];
  //     return `${result}${command}${xPoint},${yPoint}`;
  //   }, "") + "Z";

  return (
    <path
      d={waterLinePath /* + wavePath*/}
      stroke={colors.wave}
      strokeWidth={hex.waterLineWidth}
      //strokeDasharray={`${hex.waveLength}, ${hex.waveGap}`}
      //strokeDashoffset={seed * hex.waveGap}
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
  );
};

export default WaterLine;
