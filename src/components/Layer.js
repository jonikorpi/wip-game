import React from "react";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const Layer = ({ zOffset = 0, children, angle = 1 }) => {
  const x = 0;
  const y = zOffset
    ? `${(angle - 1) * zOffset / styles.perspective * hex.size}`
    : 0;

  return (
    <g className="layer" transform={`translate(${x},${y})`}>
      {children}
    </g>
  );
};

export default Layer;
