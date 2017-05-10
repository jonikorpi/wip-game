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
        {/*animation: entry 414ms ease-out;*/}
      }

      @keyframes entry {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      .layer {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      {/*.waterLines {
        animation: ${"waterLines 2.5s steps(5) infinite alternate"};
      }

      @keyframes waterLines {
        0% { transform: translateY(0);  }
        20% { transform: translateY(1px);  }
        40% { transform: translateY(2px);  }
        60% { transform: translateY(3px);  }
        80% { transform: translateY(4px);  }
        100% { transform: translateY(5px);  }
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
