import React from "react";
import flatten from "flat";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const RegionUI = ({ targetLocation }) => {
  const { left, top } = { ...targetLocation };
  const fields = targetLocation && flatten(targetLocation);

  return (
    <div id="regionUI">
      <style jsx global>{`
        #regionUI {
          position: absolute;
          left: 0; top: 0; bottom: 0; right: 0;
          overflow: hidden;
          z-index: 100;
          font-size: 0.5rem;
          line-height: 0.75rem;
          padding: 0.25rem;
        }

        #regionUI b {
          font-weight: bold;
        }

        #regionUI p {
          white-space: nowrap;
        }
      `}</style>

      <div id="regionUI">
        {fields &&
          Object.keys(fields).map((field, key) => {
            return <p key={key}>{field}: <b>{fields[field] || "null"}</b></p>;
          })}
      </div>
    </div>
  );
};

export default RegionUI;
