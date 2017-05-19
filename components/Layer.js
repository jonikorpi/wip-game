import React from "react";

import hex from "../helpers/hex.js";

const Layer = ({ children, className, style, viewBox }) => (
  <div className={`layer ${className ? className : ""}`} style={style}>

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

      .layerSVG {
        width: 100%;
        height: 100%;
      }
    `}</style>

    <svg
      className="layerSVG"
      shapeRendering="optimizeSpeed"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={
        viewBox ||
          `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`
      }
    >
      {children}
    </svg>
  </div>
);

export default Layer;
