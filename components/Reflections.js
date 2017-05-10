import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const multipliers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export default class Reflections extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    return (
      <g
        stroke={styles.reflection}
        strokeWidth={hex.roundingWidth}
        strokeLinejoin="round"
        fill={styles.reflection}
      >
        {tiles.map(({ left, top, hexPoints }, index) => {
          const reflectionPoints = hexPoints.reduce((result, point, index) => {
            return `${result} ${point[0]},${point[1] + hex.ridgeHeight + hex.ridgeHeight * multipliers[index]}`;
          }, "");

          return (
            <polygon
              key={index}
              points={reflectionPoints}
              transform={`translate(${left}, ${top})`}
            />
          );
        })}
      </g>
    );
  }
}
