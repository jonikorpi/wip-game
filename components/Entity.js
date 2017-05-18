import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const shift = (number, seed) => {
  return number + 3 * (maths.random(1, seed) - 0.5);
};

const getEntity = (type, seed) => {
  switch (type) {
    default:
    case "human":
      return (
        <path
          fill={styles.white}
          d="M0.499996582,1.07037402 L0.499996582,4 L0,3.75 L2.22044605e-16,0.785187012 L0.499996582,1.07037402 Z M0.499996582,0.5 L1,0.785187012 L0.499996582,1.07037402 L0,0.785187012 L0.499996582,0.5 Z M0.499996582,1.07037402 L1,0.785187012 L1,3.75 L0.499996582,4 L0.499996582,1.07037402 Z"
        />
      );

    case "mountain":
      return (
        <g
          fill="none"
          fill-rule="evenodd"
          transform={`scale(${1.5 - maths.random(0.75, seed++)})`}
        >
          <polygon
            fill={styles.black}
            fill-rule="nonzero"
            points={`${26} 9.011 23.015 7.25 20.182 5.578 0 34.022 11.224 41.502 ${26} 49.033`}
          />
          <polygon
            fill={styles.rock}
            fill-rule="nonzero"
            points={`${26} 9.01 ${26} 49.03 40.15 41.861 52 34.02 32.459 5.578 29.127 7.348`}
          />
          <polygon
            fill={styles.wave}
            points={`${shift(26, seed + 1)} 1.653 24.023 .601 20.182 5.549 22.984 7.2 ${26} 8.964`}
          />
          <polygon
            fill={styles.wave}
            points={`${shift(26, seed + 1)} 1.652 ${26} 8.962 29.194 7.252 32.406 5.548 27.97 .601`}
          />
          <polygon
            fill={styles.wave}
            points={`${shift(26, seed + 1)} -.444 24.023 .607 ${26} 1.659 27.977 .607`}
          />
        </g>
      );
  }
};

const Entity = ({ key, x = 0, y = 0, type = "human", seed }) => {
  return (
    <g key={key}>
      {getEntity(type, seed)}
    </g>
  );
};

export default Entity;
