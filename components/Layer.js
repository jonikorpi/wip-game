import React from "react";

import hex from "../helpers/hex.js";

const Layer = ({ children, className, style, viewBox }) => (
  <svg
    className={`layer ${className ? className : ""}`}
    style={style}
    shapeRendering="optimizeSpeed"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox={
      viewBox ||
        `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`
    }
  >
    <style jsx>{`
      .layer {
        width: 300%;
        height: 300%;
        position: absolute;
        left: -100%;
        top: -100%;
        will-change: --zoom, --playerX, --playerY, transform;
        {/*-webkit-backface-visibility: hidden;
        backface-visibility: hidden;*/}
      }
    `}</style>

    {children}
  </svg>
);

export default Layer;
