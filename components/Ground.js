import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

import SVG from "../components/SVG.js";
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
const roundingWidth = hex.size / 9;
const waterLineWidth = hex.size / 62;
const waveLength = hex.size / 3;
const waveGap = hex.size / 11;

export default ({ x, y, zIndex }) => {
  let seed = (x || 1) * (y || 2);

  const hexagonPoints = hexPointCoordinates.reduce((result, point) => {
    return (
      result +
      ` ${hex.horizontalPadding + point[0] + maths.random(randomRange, seed++) * (point[0] < hex.width / 2 ? -1 : 1)},${hex.verticalPadding + point[1] + maths.random(randomRange, seed++) * (point[1] < hex.height / 2 ? -0.5 : 0.5)}`
    );
  }, "");

  return (
    <div className="ground">
      <style jsx global>{`
        .waterLine {
          {/*backface-visibility: hidden;
          animation: waterLine 6s linear infinite alternate;*/}
        }

        {/*@keyframes waterLine {
          0%, 62% { transform: scale(0.944); }
          100%    { transform: scale(1); }
        }*/}
      `}</style>

      <SVG
        className="waterLine"
        style={{
          zIndex: zIndex - 20,
        }}
      >
        <polygon
          stroke={styles.white}
          strokeWidth={waterLineWidth + roundingWidth}
          transform={`translate(0, ${waterLineWidth})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}, ${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}, ${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}, ${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}`}
          strokeDashoffset={seed % 100}
          fill="none"
          points={hexagonPoints}
        />
      </SVG>

      <SVG style={{ zIndex: zIndex - 10 }}>
        <polygon
          stroke={styles.black}
          strokeWidth={roundingWidth}
          strokeLinejoin="round"
          fill={styles.black}
          points={hexagonPoints}
        />

        <Entity
          x={hex.horizontalPadding + hex.width / 2}
          y={hex.verticalPadding + hex.height / 2}
          type="human"
        />
      </SVG>
    </div>
  );
};
