import React from "react";

import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const Layer = ({ viewBox, zIndex = 1, zOffset = 0, children }) => {
  return (
    <svg
      className="layer"
      shapeRendering="optimizeSpeed"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="none"
      viewBox={viewBox}
      style={{
        zIndex: zIndex,
        transform: `translateY(
          calc(
            (${styles.perspective}vw - ${styles.perspective * styles.maxHeight}vmin)
            * ${zOffset}
          )
        )`,
      }}
    >
      <style jsx global>{`
        .layer {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      `}</style>

      {children}
    </svg>
  );
};

export default Layer;
