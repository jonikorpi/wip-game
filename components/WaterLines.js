import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const xModifiers = [-1, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1];
const dashArray = `${hex.waveLength}, ${hex.waveGap}`;

export default class WaterLines extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    const waterLinePath = tiles.reduce(
      (result, { left, top, hexPoints }, index) => {
        return (
          result +
          hexPoints.reduce((result, point, index) => {
            const command = index === 0 ? "M" : "L";
            const xPoint =
              point[0] + hex.waterLineOffset * xModifiers[index] + left;
            const yPoint =
              point[1] +
              hex.ridgeHeight +
              hex.waterLineOffset * (index < 9 ? -0.5 : 1) +
              top +
              hex.waterLineWidth;
            return `${result}${command}${xPoint},${yPoint}`;
          }, "") +
          "Z"
        );
      },
      ""
    );

    const wavePath = tiles.reduce((result, { left, top, hexPoints }, index) => {
      return (
        result +
        hexPoints.reduce((result, point, index) => {
          const command = index === 0 ? "M" : "L";
          const xPoint =
            point[0] + hex.waterLineOffset * 2.5 * xModifiers[index] + left;
          const yPoint =
            point[1] +
            hex.ridgeHeight +
            hex.waterLineOffset * 2.5 * (index < 9 ? -0.5 : 1) +
            top +
            hex.waterLineWidth;
          return `${result}${command}${xPoint},${yPoint}`;
        }, "") +
        "Z"
      );
    }, "");

    return (
      <g
        stroke={styles.wave}
        strokeWidth={hex.waterLineWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >
        <path d={waterLinePath} />
        <path stroke={styles.wave} d={wavePath} strokeDasharray={dashArray} />
      </g>
    );
  }
}
