import React from "react";

import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const Layer = ({ zOffset = 0, children }) => {
  const transform = `translateY(
    calc(
      (${styles.perspective}vw - ${styles.perspective * styles.maxHeight}vmin)
      * ${zOffset}
    )
  )`;

  return (
    <g
      style={{
        WebkitTransform: transform,
        transform: transform,
      }}
    >
      {children}
    </g>
  );
};

export default Layer;
