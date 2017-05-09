import React from "react";

import hex from "../helpers/hex.js";

const cellPaddingX = hex.width * (hex.perRow / 2) + hex.width;
const cellPaddingY = hex.height * 2;

export default ({ children, className, zIndex, tiles }) => (
  <div
    className={`layerContainer ${className ? className : ""}`}
    style={{
      left: -cellPaddingX * hex.renderingSize + hex.unit,
      right: -cellPaddingX * hex.renderingSize + hex.unit,
      top: -cellPaddingY * hex.renderingSize + hex.unit,
      bottom: -cellPaddingY * hex.renderingSize + hex.unit,
      zIndex: zIndex,
    }}
  >
    <style jsx>{`
      .layerContainer {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        {/*outline: 1px solid currentcolor;*/}
      }

      .layer {
        width: 100%;
        height: 100%;
      }

      {/*.waterLine {
        animation: waterLine 1s steps(2, start) infinite;
      }

      @keyframes waterLine {
        from { opacity: 1  }
        to { opacity: 0  }
      }*/}
    `}</style>

    <svg
      className="layer"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={`${-cellPaddingX} ${-cellPaddingY} ${hex.cellWidth / hex.renderingSize + cellPaddingX * 2} ${hex.cellHeight / hex.renderingSize + cellPaddingY * 2}`}
    >
      {children}
    </svg>
  </div>
);
