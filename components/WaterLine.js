import React from "react";

import hex from "../helpers/hex.js";

export default ({ x, y, left, top, hexPoints }) => {
  let seed = (x || 123) * (y || 456);

  const waterLinePoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1] + hex.ridgeHeight}`;
  }, "");

  return (
    <polygon
      strokeDashoffset={seed++ % 100}
      transform={`translate(${left}, ${top + hex.waterLineWidth})`}
      points={waterLinePoints}
    />
  );
};
