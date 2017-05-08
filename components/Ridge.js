import React from "react";

import hex from "../helpers/hex.js";

export default ({ x, y, left, top, hexPoints }) => {
  const ridgePoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1] + hex.ridgeHeight}`;
  }, "");

  return (
    <polygon points={ridgePoints} transform={`translate(${left}, ${top})`} />
  );
};
