import React from "react";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const Layer = ({ zOffset = 0, children, angle = 1, rotate = 0 }) => {
  const x = rotate === 90 ? hex.perRegionX / hex.perRegionY * hex.width : 0;
  const y = zOffset
    ? `${(angle - 1) * zOffset / styles.perspective * hex.size}`
    : 0;

  return (
    <g
      className="layer"
      transform={`translate(${x},${y}) rotate(${rotate || 0})`}
    >
      {children}
    </g>
  );
};

export default Layer;
