import React from "react";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default ({ index }) => {
  return (
    <div className="tile">
      <style jsx global>{`
        .tile {

        }

        .tileOutline {
          background: ${styles.white};
          color: ${styles.black};

        }

        .tileTop,
        .tileBottom {
          border-left: ${hex.width / 2}px solid transparent;
          border-right: ${hex.width / 2}px solid transparent;
        }

        .tileTop {
          border-bottom: ${hex.size / 2}px solid;
        }

        .tileMiddle {
          height: ${hex.size}px;
          text-align: center;
          line-height: ${hex.size}px;
        }

        .tileBottom {
          border-top: ${hex.size / 2}px solid;
        }
      `}</style>

      <div className="tileOutline tileTop" />
      <div className="tileOutline tileMiddle">{index}</div>
      <div className="tileOutline tileBottom" />
    </div>
  );
};
