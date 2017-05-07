import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

export default ({ x, y, zIndex }) => {
  let seed = (x || 1) * (y || 2);

  const hexPointCoordinates = [
    [hex.width / 2, 0],
    [hex.width, hex.height / 4],
    [hex.width, hex.height * 0.75],
    [hex.width / 2, hex.height],
    [0, hex.height * 0.75],
    [0, hex.height / 4],
  ];

  const randomRange = hex.size / 3;
  const horizontalPadding = hex.width / 4;
  const verticalPadding = hex.height / 4;
  const roundingWidth = hex.size / 5;
  const waterLineWidth = hex.size / 50;
  const waterLineTotalWidth = roundingWidth + waterLineWidth;

  const hexagonPoints = hexPointCoordinates.reduce((result, point) => {
    return (
      result +
      ` ${horizontalPadding + point[0] + maths.random(randomRange, seed++) * (point[0] < hex.width / 2 ? -1 : 1)},${verticalPadding + point[1] + maths.random(randomRange, seed++) * (point[1] < hex.height / 2 ? -0.5 : 0.5)}`
    );
  }, "");

  const xOffset = hex.width / 2 + maths.random(hex.size / 2, seed);
  const yOffset = hex.height / 2 + maths.random(hex.size / 2, seed);

  return (
    <div>
      <style jsx>{`
        .tileOutline {
          position: absolute;
          left: -${hex.width / 4 * hex.renderingSize}${hex.unit};
          top: -${hex.height / 4 * hex.renderingSize}${hex.unit};
          width: 150%;
          height: 150%;
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
          strokeLinejoin="round"
          strokeDasharray="5, 0.25, 3, 0.5, 5, 0.333"
          strokeDashoffset={seed % 100}
          fill="none"
          points={hexagonPoints}
          transform={`translate(${xOffset}, ${waterLineWidth + yOffset}) scale(0.1)`}
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
          transform={`translate(${xOffset}, ${yOffset}) scale(0.1)`}
        />
      </svg>
    </div>
  );
};
