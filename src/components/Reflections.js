import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const multipliers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export default class Reflections extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    const reflectionPath = tiles.reduce(
      (result, { left, top, hexPoints }, index) => {
        return (
          result +
          hexPoints.reduce((result, point, index) => {
            const command = index === 0 ? "M" : "L";
            const xPoint = point[0] + left;
            const yPoint =
              point[1] +
              top +
              hex.ridgeHeight +
              hex.ridgeHeight * multipliers[index];
            return `${result}${command}${xPoint},${yPoint}`;
          }, "") +
          "Z"
        );
      },
      ""
    );

    return (
      <g
        stroke={styles.reflection}
        strokeWidth={hex.roundingWidth}
        strokeLinejoin="round"
        fill={styles.reflection}
      >
        <path d={reflectionPath} />
      </g>
    );
  }
}
