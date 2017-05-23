import React from "react";

import hex from "../helpers/hex.js";

const padding = 0.25;

const Layer = ({ children, className, style, viewBox }) => (
  <svg
    className={`layer ${className ? className : ""}`}
    style={style}
    shapeRendering="optimizeSpeed"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox={
      viewBox ||
        `${hex.width * -padding} ${hex.height * -padding} ${hex.width * (1 + padding * 2)} ${hex.height * (1 + padding * 2)}`
    }
  >
    <style jsx global>{`
      .layer {
        width: ${(1 + padding * 2) * 100}%;
        height: ${(1 + padding * 2) * 100}%;
        position: absolute;
        left: ${padding * -100}%;
        top: ${padding * -100}%;
        transition: transform 618ms linear;
        will-change: transform, opacity, --zoom, --playerX, --playerY;
        opacity: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;

        animation: entry 333ms ease-out 3000ms;
        animation-fill-mode: forwards;
      }

      @keyframes entry {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `}</style>

    {children}
  </svg>
);

export default Layer;
