import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

import Entity from "../components/Entity.js";

const hexPointCoordinates = [
  [hex.width / 3, hex.height / 13],
  [hex.width / 2, 0],
  [hex.width / 3 * 2, hex.height / 13],

  [hex.width / 9 * 7, hex.height / 13 * 2],
  [hex.width, hex.height / 4],
  [hex.width, hex.height / 8 * 3],

  [hex.width, hex.height / 8 * 5],
  [hex.width, hex.height * 0.75],
  [hex.width / 8 * 7, hex.height / 5 * 4],

  [hex.width / 8 * 5, hex.height / 13 * 12],
  [hex.width / 2, hex.height],
  [hex.width / 8 * 3, hex.height / 13 * 12],

  [hex.width / 9 * 2, hex.height / 6 * 5],
  [0, hex.height * 0.75],
  [0, hex.height / 8 * 5],

  [0, hex.height / 8 * 3],
  [0, hex.height / 4],
  [hex.width / 9 * 2, hex.height / 13 * 2],
];

const randomRange = hex.size / 10;
const horizontalPadding = hex.width;
const verticalPadding = hex.height;
const roundingWidth = hex.size / 9;
const waterLineWidth = hex.size / 50;
const waterLineTotalWidth = roundingWidth + waterLineWidth;

export default ({ x, y, zIndex }) => {
  let seed = (x || 1) * (y || 2);

  const hexagonPoints = hexPointCoordinates.reduce((result, point) => {
    return (
      result +
      ` ${horizontalPadding + point[0] + maths.random(randomRange, seed++) * (point[0] < hex.width / 2 ? -1 : 1)},${verticalPadding + point[1] + maths.random(randomRange, seed++) * (point[1] < hex.height / 2 ? -0.5 : 0.5)}`
    );
  }, "");

  return (
    <div>
      <style jsx>{`
        .tileOutline {
          position: absolute;
          left: -${horizontalPadding * hex.renderingSize}${hex.unit};
          top: -${verticalPadding * hex.renderingSize}${hex.unit};
          width: ${(horizontalPadding + hex.width * 2) / horizontalPadding * 100}%;
          height: ${(verticalPadding + hex.height * 2) / verticalPadding * 100}%;
        }
      `}</style>

      <svg
        className="tileOutline"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${hex.width + horizontalPadding * 2} ${hex.height + verticalPadding * 2}`}
        style={{ zIndex: zIndex - 20 }}
      >
        <polygon
          className="waterLine"
          stroke={styles.white}
          strokeWidth={waterLineTotalWidth}
          transform={`translate(0, ${waterLineWidth})`}
          strokeLinejoin="round"
          strokeDasharray={`${hex.size / 20}, ${hex.size / 30}, ${hex.size / 3}, ${hex.size / 30}, ${hex.size / 2}, ${hex.size / 25}`}
          strokeDashoffset={seed % 100}
          fill="none"
          points={hexagonPoints}
        />
      </svg>

      <svg
        className="tileOutline"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${hex.width + horizontalPadding * 2} ${hex.height + verticalPadding * 2}`}
        style={{ zIndex: zIndex - 10 }}
      >
        <polygon
          stroke={styles.black}
          strokeWidth={roundingWidth}
          strokeLinejoin="round"
          fill={styles.black}
          points={hexagonPoints}
        />

        <Entity
          x={horizontalPadding + hex.width / 2}
          y={verticalPadding + hex.height / 2}
          type="human"
        />
      </svg>
    </div>
  );
};
