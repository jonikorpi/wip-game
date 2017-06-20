import React from "react";

import hex from "../helpers/hex.js";

const SVG = ({ style, children, viewBox, className }) => {
  return (
    <svg
      className={"svg " + (className ? className : "")}
      shapeRendering="optimizeSpeed"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="none"
      viewBox={
        viewBox ||
        `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`
      }
      style={style}
    >
      {children}
    </svg>
  );
};

export default SVG;
