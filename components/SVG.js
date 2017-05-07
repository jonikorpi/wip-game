import React from "react";

import hex from "../helpers/hex.js";

export default ({ children, style, className }) => {
  return (
    <div className={`svgContainer ${className ? className : ""}`} style={style}>
      <style jsx>{`
        .svgContainer {
          position: absolute;
          left: -${hex.horizontalPadding * hex.renderingSize}${hex.unit};
          top: -${hex.verticalPadding * hex.renderingSize}${hex.unit};
          width: ${(hex.horizontalPadding + hex.width * 2) / hex.horizontalPadding * 100}%;
          height: ${(hex.verticalPadding + hex.height * 2) / hex.verticalPadding * 100}%;
        }

        .svg {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${hex.width + hex.horizontalPadding * 2} ${hex.height + hex.verticalPadding * 2}`}
      >
        {children}
      </svg>
    </div>
  );
};
