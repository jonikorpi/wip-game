import React from "react";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const Layer = ({ zOffset = 0, children, heightRatio = 1 }) => {
  return (
    <g
      className="layer"
      transform={
        zOffset
          ? `translate(0,${(1 - heightRatio) * zOffset / styles.perspective * hex.size})`
          : undefined
      }
    >
      {children}
    </g>
  );
};

export default Layer;
