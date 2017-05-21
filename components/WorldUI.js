import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

const WorldUI = ({ targetedTile }) => {
  const { x, y, left, top, tileType, entityType, heroes } = { ...targetedTile };

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
        }
      `}</style>

      <h1>{tileType && tileType.name}</h1>
      <p>{entityType}</p>
      <p>{heroes ? heroes.length : 0} heroes</p>
      <small>({x}, {y})</small>
    </div>
  );
};

export default WorldUI;
