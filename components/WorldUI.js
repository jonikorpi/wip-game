import React from "react";
import flatten from "flat";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const WorldUI = ({ targetedTile }) => {
  const { left, top } = { ...targetedTile };
  const fields = targetedTile && flatten(targetedTile);

  const style = typeof left === "number" && typeof top === "number"
    ? maths.getTransform(left, top, 100)
    : { opacity: 0 };

  return (
    <div id="worldUI">
      <style jsx global>{`
        #worldUI {
          position: absolute;
          left: 0; top: 0;
          z-index: 100;
          font-size: 0.625rem;
          line-height: 0.75rem;
        }

        #worldUI b {
          font-weight: bold;
        }

        #worldUI p {
          white-space: nowrap;
        }

        #tooltip {
          position: absolute;
          left: ${hex.width / 2 * hex.renderingSize + hex.unit};
          top: 0;
          border-left: 1px solid ${styles.white};
          padding-left: 0.25rem;
          will-change: transform, opacity, --zoom, --playerX, --playerY;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        #hud {
          position: absolute;
          left: -50vw;
          top: -50vh;
          width: 100vw;
          height: 100vh;
          margin-left: ${hex.width / 2 * hex.renderingSize + hex.unit};
          margin-top: ${hex.height / 2 * hex.renderingSize + hex.unit};
          padding: 0.25rem;
        }
      `}</style>

      <div id="tooltip" style={style}><b>Tooltip</b></div>

      <div id="hud">
        {fields &&
          Object.keys(fields).map((field, key) => {
            return <p key={key}>{field}: <b>{fields[field] || "null"}</b></p>;
          })}
      </div>
    </div>
  );
};

export default WorldUI;
