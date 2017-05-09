import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const xModifiers = [-1, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1];

export default class WaterLines extends PureComponent {
  render() {
    const { tiles } = { ...this.props };

    return (
      <g
        stroke={styles.white}
        strokeWidth={hex.waterLineWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >

        {tiles.map(({ left, top, hexPoints }, index) => {
          const waterLinePoints = hexPoints.reduce((result, point, index) => {
            const xPoint = point[0] + hex.waterLineOffset * xModifiers[index];
            const yPoint =
              point[1] +
              hex.ridgeHeight +
              hex.waterLineOffset * (index < 9 ? -0.5 : 1);
            return `${result} ${xPoint},${yPoint}`;
          }, "");

          return (
            <polygon
              key={index}
              strokeDashoffset={left * top % 200}
              transform={`translate(${left}, ${top + hex.waterLineWidth})`}
              points={waterLinePoints}
            />
          );
        })}
        <g strokeDasharray={`${hex.waveLength}, ${hex.waveGap} `}>
          {tiles.map(({ left, top, hexPoints }, index) => {
            const waterLinePoints = hexPoints.reduce((result, point, index) => {
              const xPoint =
                point[0] + hex.waterLineOffset * 2.5 * xModifiers[index];
              const yPoint =
                point[1] +
                hex.ridgeHeight +
                hex.waterLineOffset * 2.5 * (index < 9 ? -0.5 : 1);
              return `${result} ${xPoint},${yPoint}`;
            }, "");

            return (
              <polygon
                key={index}
                strokeDashoffset={left * top * top * left % 200}
                transform={`translate(${left}, ${top + hex.waterLineWidth})`}
                points={waterLinePoints}
              />
            );
          })}
        </g>
      </g>
    );
  }
}
