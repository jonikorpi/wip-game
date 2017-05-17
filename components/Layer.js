import React from "react";

import hex from "../helpers/hex.js";

export default ({ children, className, style }) => (
  <svg
    className={`layer ${className ? className : ""}`}
    shapeRendering="optimizeSpeed"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox={`${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`}
    style={style}
  >
    <style jsx>{`
      .layer {
        width: 300%;
        height: 300%;
        position: absolute;
        left: -100%; top: -100%;
      }
    `}</style>

    {children}
  </svg>
);
