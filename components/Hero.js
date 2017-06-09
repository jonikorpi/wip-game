import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Hero extends React.PureComponent {
  render() {
    const { landscape, angle, ...hero } = this.props;
    const [x, y] = hero.location.split(",");

    const position = maths.getTransformStyle(landscape, [+x, +y]);
    const viewBox = maths.getViewBox(landscape);

    return (
      <div className="hero" style={{ ...position, zIndex: y + 10 }}>
        <style jsx global>{`
          .hero {
            transition: transform 2s ease-in-out;
            will-change: transform;
            backface-visibility: hidden;
          }
        `}</style>

        <SVG viewBox={viewBox}>
          <Layer angle={angle}>
            <text fill={styles.rock} x={hex.width / 2} y={hex.height / 2}>
              H
            </text>
          </Layer>
          <Layer angle={angle} zOffset={-2}>
            <text fill={styles.white} x={hex.width / 2} y={hex.height / 2}>
              H
            </text>
          </Layer>
        </SVG>
      </div>
    );
  }
}
