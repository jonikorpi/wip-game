import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const xModifiers = [-1, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1];

export default class OuterWaterLines extends PureComponent {
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
          const outerWaterLinePoints = hexPoints.reduce(
            (result, point, index) => {
              const xPoint =
                point[0] + hex.outerWaterLineOffset * xModifiers[index];
              const yPoint =
                point[1] +
                hex.ridgeHeight +
                hex.outerWaterLineOffset * (index < 9 ? -0.5 : 1);
              return `${result} ${xPoint},${yPoint}`;
            },
            ""
          );

          return (
            <polygon
              key={index}
              strokeDashoffset={left * top % 200}
              transform={`translate(${left}, ${top + hex.waterLineWidth})`}
              points={outerWaterLinePoints}
            />
          );
        })}
        <g strokeDasharray={`${hex.outerWaveLength}, ${hex.outerWaveGap} `}>
          {tiles.map(({ left, top, hexPoints }, index) => {
            const outerWaterLinePoints = hexPoints.reduce(
              (result, point, index) => {
                const xPoint =
                  point[0] + hex.outerWaterLineOffset * 2.5 * xModifiers[index];
                const yPoint =
                  point[1] +
                  hex.ridgeHeight +
                  hex.outerWaterLineOffset * 2.5 * (index < 9 ? -0.5 : 1);
                return `${result} ${xPoint},${yPoint}`;
              },
              ""
            );

            return (
              <polygon
                key={index}
                strokeDashoffset={left * top * top * left % 200}
                transform={`translate(${left}, ${top + hex.waterLineWidth})`}
                points={outerWaterLinePoints}
              />
            );
          })}
        </g>
      </g>
    );
  }
}
