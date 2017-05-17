import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default class Grounds extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    const groundsPath = tiles.reduce(
      (result, { left, top, hexPoints }, index) => {
        return (
          result +
          hexPoints.reduce((result, point, index) => {
            const command = index === 0 ? "M" : "L";
            const xPoint = point[0] + left;
            const yPoint = point[1] + top;
            return `${result}${command}${xPoint},${yPoint}`;
          }, "") +
          "Z"
        );
      },
      ""
    );

    return (
      <g
        stroke={styles.black}
        strokeWidth={hex.roundingWidth}
        strokeLinejoin="round"
        fill={styles.black}
      >
        <path d={groundsPath} />
      </g>
    );
  }
}
