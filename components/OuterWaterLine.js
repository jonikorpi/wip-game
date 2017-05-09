import React from "react";

import hex from "../helpers/hex.js";

const xModifiers = [-1, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1];

export default ({ x, y, left, top, hexPoints, offset }) => {
  let seed = (x || 123) * (y || 456);

  const outerWaterLinePoints = hexPoints.reduce((result, point, index) => {
    const xPoint = point[0] + offset * xModifiers[index];
    const yPoint = point[1] + hex.ridgeHeight + offset * (index < 9 ? -0.5 : 1);
    return `${result} ${xPoint},${yPoint}`;
  }, "");

  return (
    <polygon
      strokeDashoffset={seed * seed % 200}
      transform={`translate(${left}, ${top + hex.waterLineWidth})`}
      points={outerWaterLinePoints}
    />
  );
};
