import React from "react";
import { Entity } from "aframe-react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

const xModifiers = [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1, -1];
const yModifiers = [
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  -1,
  -1,
  -1,
];

const Ground = ({ points }) => {
  const path = points.map((point, index) => {
    // const locationSeed = maths.getSeed([point[0], point[1]]);
    // const beachRNG = maths.random(hex.beachWidth, locationSeed);
    // const beachWidth = beachRNG > hex.beachWidth * 0 ? beachRNG : 0;

    const x =
      point[0] + (hex.roundingWidth - hex.beachWidth) * xModifiers[index];
    const z =
      point[1] + (hex.roundingWidth - hex.beachWidth) * yModifiers[index];
    const y = 0.02;

    return { x: x, y: y, z: z };
  });

  return (
    <Entity
      class="target"
      faceset={{ vertices: path }}
      // geometry={{
      //   primitive: "box",
      //   buffer: false,
      //   skipCache: true,
      // }}
      material={{
        color: styles.black,
        shader: "flat",
        // wireframe: true,
      }}
    />
  );
};

export default Ground;
