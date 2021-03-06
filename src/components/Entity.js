import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Entity extends React.PureComponent {
  render() {
    const { x, y, angle, regionSeed, name } = {
      ...this.props,
    };

    const position = maths.getPositionStyle([x, y]);
    // let seed = regionSeed + maths.getSeed([x, y]);

    return (
      <div className="entity" style={position}>
        <SVG style={{ zIndex: 5 + y + hex.regionRadius }}>
          <Layer angle={angle}>
            <text fill={styles.rock} x={hex.width / 2} y={hex.height / 2}>
              {name}
            </text>
          </Layer>
          <Layer angle={angle} zOffset={-2}>
            <text fill={styles.white} x={hex.width / 2} y={hex.height / 2}>
              {name}
            </text>
          </Layer>
        </SVG>
      </div>
    );
  }
}
