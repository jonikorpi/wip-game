import React from "react";

import SVG from "../components/SVG.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const regionCoordinates = regionPosition => {
  const x = 0.5 * 3 / 2 * regionPosition[1];
  const y = 0.575 * Math.sqrt(3) * (regionPosition[0] + regionPosition[1] / 2);

  return [x, y];
};

const RegionContainer = ({ children, position }) => {
  const [x, y] = regionCoordinates(position);
  const transform = `translate(${x * 100}%, ${y * 100}%)`;

  return (
    <div
      className="regionContainer"
      style={{ WebkitTransform: transform, transform: transform }}
    >
      <SVG viewBox={`0 0 ${200} ${174}`} className="regionOutline">
        <path
          className="regionOutline"
          stroke={styles.white}
          strokeWidth="0.125"
          fill="none"
          d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"
          vectorEffect="non-scaling-stroke"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      </SVG>

      {children}
    </div>
  );
};

export default RegionContainer;
