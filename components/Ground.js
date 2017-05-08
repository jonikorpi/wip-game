import React from "react";

export default ({ x, y, left, top, hexPoints }) => {
  const groundPoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1]}`;
  }, "");

  return (
    <polygon points={groundPoints} transform={`translate(${left}, ${top})`} />
  );
};
