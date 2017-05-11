import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default class Ridges extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    const ridgePath = tiles.reduce(
      (result, { left, top, hexPoints }, index) => {
        return (
          result +
          hexPoints.reduce((result, point, index) => {
            const command = index === 0 ? "M" : "L";
            const xPoint = point[0] + left;
            const yPoint = point[1] + top + hex.ridgeHeight;
            return `${result}${command}${xPoint},${yPoint}`;
          }, "") +
          "Z"
        );
      },
      ""
    );

    return (
      <g
        stroke={styles.rock}
        strokeWidth={hex.roundingWidth}
        strokeLinejoin="round"
        fill={styles.rock}
      >
        <path d={ridgePath} />
      </g>
    );
  }
}
