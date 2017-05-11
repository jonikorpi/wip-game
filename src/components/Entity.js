import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

export default ({ x = 0, y = 0, type = "human" }) => {
  const entities = {
    human: (
      <path
        fill={styles.white}
        d="M0.499996582,1.07037402 L0.499996582,4 L0,3.75 L2.22044605e-16,0.785187012 L0.499996582,1.07037402 Z M0.499996582,0.5 L1,0.785187012 L0.499996582,1.07037402 L0,0.785187012 L0.499996582,0.5 Z M0.499996582,1.07037402 L1,0.785187012 L1,3.75 L0.499996582,4 L0.499996582,1.07037402 Z"
      />
    ),
  };

  return <g transform={`translate(${x},${y})`}> {entities[type]} </g>;
};
