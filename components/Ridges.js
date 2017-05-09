import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default class Ridges extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    return (
      <g
        stroke={styles.rock}
        strokeWidth={hex.roundingWidth}
        strokeLinejoin="round"
        fill={styles.rock}
      >

        {tiles.map(({ left, top, hexPoints }, index) => {
          const ridgePoints = hexPoints.reduce((result, point) => {
            return `${result} ${point[0]},${point[1] + hex.ridgeHeight}`;
          }, "");

          return (
            <polygon
              key={index}
              points={ridgePoints}
              transform={`translate(${left}, ${top})`}
            />
          );
        })}
      </g>
    );
  }
}
