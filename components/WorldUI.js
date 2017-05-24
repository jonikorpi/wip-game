import React from "react";
import flatten from "flat";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const WorldUI = ({ targetedTile }) => {
  const { left, top } = { ...targetedTile };
  const fields = targetedTile && flatten(targetedTile);

  return (
    <div id="worldUI">
      <style jsx global>{`
        #worldUI {
          position: absolute;
          left: 0; top: 0;
          z-index: 100;
          font-size: 0.5rem;
          line-height: 0.75rem;
          padding: 0.25rem;
        }

        #worldUI b {
          font-weight: bold;
        }

        #worldUI p {
          white-space: nowrap;
        }
      `}</style>

      <div id="worldUI">
        {fields &&
          Object.keys(fields).map((field, key) => {
            return <p key={key}>{field}: <b>{fields[field] || "null"}</b></p>;
          })}
      </div>
    </div>
  );
};

export default WorldUI;
