import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default class Grounds extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    return (
      <g
        stroke={styles.black}
        strokeWidth={hex.roundingWidth}
        strokeLinejoin="round"
        fill={styles.black}
      >

        {tiles.map(({ left, top, hexPoints }, index) => {
          const groundPoints = hexPoints.reduce((result, point) => {
            return `${result} ${point[0]},${point[1]}`;
          }, "");

          return (
            <polygon
              key={index}
              points={groundPoints}
              transform={`translate(${left}, ${top})`}
            />
          );
        })}
      </g>
    );
  }
}
