import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

export default ({ x = 0, y = 0, type = "human" }) => {
  const entities = {
    human: <g />,
  };

  return <g transform={`translate(${x},${y})`}> {entities[type]} </g>;
};
