import React from "react";
import { Entity } from "aframe-react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

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

const Beach = ({ points }) => {
  const path = points.map((point, index) => {
    const command = index === 0 ? "M" : "L";
    const x = point[0] + hex.roundingWidth * xModifiers[index];
    const z = point[1] + hex.roundingWidth * xModifiers[index];
    const y = 0;

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
        color: styles.rock,
        shader: "flat",
        // wireframe: true,
      }}
    />
  );
};

export default Beach;
