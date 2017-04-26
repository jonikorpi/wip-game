import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default ({ style }) => {
  return (
    <div
      className="tile"
      style={{
        height: style.height,
        width: style.width,
        left: style.x,
        top: style.y,
      }}
    >
      <style jsx global>{`
        .tile {
          position: absolute;
        }

        .tileOutline {
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <svg
        className="tileOutline"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <polygon
          stroke="currentcolor"
          points={`
            ${hex.width / 2}, 0
            ${hex.width},     ${hex.height / 4}
            ${hex.width},     ${hex.height * 0.75}
            ${hex.width / 2}, ${hex.height}
            0,                ${hex.height * 0.75}
            0,                ${hex.height / 4}
          `}
        />
      </svg>
    </div>
  );
};
