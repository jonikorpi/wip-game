import React from "react";

const SVG = ({ viewBox, style, children }) => {
  return (
    <svg
      className="svg"
      shapeRendering="optimizeSpeed"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="none"
      viewBox={viewBox}
      style={style}
    >
      {children}
    </svg>
  );
};

export default SVG;
