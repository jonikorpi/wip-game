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
      <style jsx global>{`
        .svg {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0; top: 0; right: 0; bottom: 0;
        }
      `}</style>

      {children}
    </svg>
  );
};

export default SVG;
