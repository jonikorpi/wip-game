import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";
import Reflection from "../components/Reflection";
import Beach from "../components/Beach";
import Ground from "../components/Ground";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Tile extends React.PureComponent {
  handleMouseEnter = () => {
    this.props.setTargetedLocation(this.props.locationID);
  };

  handleMouseLeave = () => {
    this.props.setTargetedLocation(null);
  };

  render() {
    const { x, y, angle, regionSeed, walkable } = this.props;

    const position = maths.getPositionStyle([x, y]);
    let seed = regionSeed + maths.getSeed([x, y]);

    const points = hex.baseHexCoordinates.map(point => {
      return [
        point[0] +
          maths.random(hex.randomRange, seed++) *
            (point[0] < hex.width / 2 ? -1 : 1),
        point[1] +
          maths.random(hex.randomRange, seed++) *
            (point[1] < hex.height / 2 ? -0.5 : 0.5),
      ];
    });

    return (
      <div className="tile" style={position}>
        {walkable &&
          <div className="terrain">
            <SVG style={{ zIndex: 1 }}>
              <Layer angle={angle} zOffset={5}>
                <Reflection points={points} />
              </Layer>
            </SVG>
            <SVG style={{ zIndex: 2 }}>
              <Layer angle={angle} zOffset={1}>
                <Beach points={points} />
              </Layer>
            </SVG>
            <SVG style={{ zIndex: 3 }}>
              <Layer angle={angle}>
                <Ground points={points} />
              </Layer>
            </SVG>
          </div>}

        <SVG style={{ zIndex: 6 + y }}>
          <Layer>
            <polygon
              className="target"
              stroke={styles.white}
              fill="none"
              points={hex.baseHexCoordinates}
              vectorEffect="non-scaling-stroke"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            />
          </Layer>
        </SVG>
      </div>
    );
  }
}
