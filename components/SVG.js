import React from "react";

import hex from "../helpers/hex.js";

export default ({ children, style, className, viewBox }) => {
  return (
    <div className={`svgContainer ${className ? className : ""}`} style={style}>
      <style jsx>{`
        .svgContainer {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          {/*outline: 1px solid currentcolor;*/}
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
        viewBox={
          viewBox ||
            `0 0 ${hex.width + hex.horizontalPadding * 2} ${hex.height + hex.verticalPadding * 2}`
        }
      >
        {children}
      </svg>
    </div>
  );
};
