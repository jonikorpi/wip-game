import React from "react";
import flatten from "flat";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const WorldUI = ({ targetedTile }) => {
  const { left, top } = { ...targetedTile };
  const fields = targetedTile && flatten(targetedTile);

  const style = typeof left === "number" && typeof top === "number"
    ? maths.getTransform(left, top, 100, true)
    : { opacity: 0 };

  return (
    <div id="worldUI" style={style}>
      <style jsx global>{`
        #worldUI {
          position: absolute;
          left: ${hex.width / 2 * hex.renderingSize + hex.unit};
          bottom: 0;
          border-left: 1px solid ${styles.white};
          padding-left: 0.25rem;
          will-change: transform, opacity, --zoom, --playerX, --playerY;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          font-size: 0.5rem;
          line-height: 0.75rem;
        }

        #worldUI b {
          font-weight: bold;
        }

        #worldUI p {
          white-space: nowrap;
        }
      `}</style>

      {fields &&
        Object.keys(fields).map(field => {
          return <p>{field}: <b>{fields[field] || "null"}</b></p>;
        })}
    </div>
  );
};

export default WorldUI;
