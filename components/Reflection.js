import React from "react";

import hex from "../helpers/hex.js";

const multipliers = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1.382,
  1.618,
  1.382,
  1,
  1,
  1,
];

export default ({ x, y, left, top, hexPoints }) => {
  const reflectionPoints = hexPoints.reduce((result, point, index) => {
    return `${result} ${point[0]},${point[1] + hex.ridgeHeight + hex.ridgeHeight * 0.618 * multipliers[index]}`;
  }, "");

  return (
    <polygon
      points={reflectionPoints}
      transform={`translate(${left}, ${top})`}
    />
  );
};
