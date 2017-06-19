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
    const { x, y, angle, landscape, regionSeed, walkable } = this.props;

    const position = maths.getPositionerStyle(landscape, [x, y]);
    const viewBox = maths.getViewBox(landscape);
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
            <SVG viewBox={viewBox} style={{ zIndex: 1 }}>
              <Layer angle={angle} rotate={!landscape && 90} zOffset={5}>
                <Reflection points={points} />
              </Layer>
            </SVG>
            <SVG viewBox={viewBox} style={{ zIndex: 2 }}>
              <Layer angle={angle} rotate={!landscape && 90} zOffset={1}>
                <Beach points={points} />
              </Layer>
            </SVG>
            <SVG viewBox={viewBox} style={{ zIndex: 3 }}>
              <Layer angle={angle} rotate={!landscape && 90}>
                <Ground points={points} />
              </Layer>
            </SVG>
          </div>}

        <SVG viewBox={viewBox} style={{ zIndex: 6 + y }}>
          <Layer rotate={!landscape && 90}>
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
