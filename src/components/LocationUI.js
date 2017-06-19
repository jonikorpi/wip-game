import React from "react";
import flatten from "flat";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const LocationUI = ({ target }) => {
  // const [x, y] = target && target.locationID.split(",");
  const fields = target && flatten(target);

  return (
    <div className="locationUI">
      {fields &&
        Object.keys(fields).map((field, key) => {
          return (
            <p key={key}>{field}: <b>{"" + fields[field] || "null"}</b></p>
          );
        })}
    </div>
  );
};

export default LocationUI;
