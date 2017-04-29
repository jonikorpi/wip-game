import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default ({ style, x, y, zIndex }) => {
  return (
    <div
      className="tile"
      style={{
        height: style.height + hex.unit,
        width: style.width + hex.unit,
        left: style.x + hex.unit,
        top: style.y + hex.unit,
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

        .tileTarget {
          top: ${hex.height * 0.125}${hex.unit};
          height: ${hex.height * 0.75}${hex.unit};
          position: relative;
          pointer-events: all;
          cursor: pointer;
          opacity: 0;
          outline: 1px solid;
        }

        .tileTarget:hover,
        .tileTarget:focus {
          opacity: 1;
        }

        .tileCoordinates {
          text-align: center;
          display: block;
          font-size: ${hex.height * 0.2}${hex.unit};
          line-height: ${hex.height * 0.75}${hex.unit};
        }
      `}</style>

      <svg
        className="tileOutline"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${hex.width} ${hex.height}`}
      >
        <polygon
          stroke="currentcolor"
          strokeWidth={hex.width / 100}
          fill="none"
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

      <div className="tileTarget" style={{ zIndex: zIndex }}>
        <code className="tileCoordinates">{x},{y}</code>
      </div>
    </div>
  );
};
