import React from "react";

import Layer from "../components/Layer.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default class Location extends React.Component {
  handleMouseEnter = () => {
    this.props.targetLocation(this.props.locationID);
  };

  handleMouseLeave = () => {
    this.props.targetLocation(null);
  };

  render() {
    const { locationID, x, y } = { ...this.props };
    let zIndex = 10;
    const viewBox = `0 ${hex.height * -1 / 16} ${hex.width * (hex.perRegionAxis + 0.5)} ${hex.height * (hex.perRegionAxis + 3 / 4) * 3 / 4}`;
    const pixelCoordinates = hex.pixelCoordinates([x, y]);

    return (
      <g
        className="location"
        transform={`translate(${pixelCoordinates[0]},${pixelCoordinates[1]})`}
      >
        <style jsx global>{`
          .target {
            pointer-events: all;
            touch-action: manipulation;
          }

          .target:hover, .target:focus {
            stroke: ${styles.white};
          }
        `}</style>

        <polygon
          className="target"
          stroke="none"
          fill="none"
          points={hex.baseHexCoordinates}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      </g>
    );
  }
}
