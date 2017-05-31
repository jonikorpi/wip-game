import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";
import LocationUI from "../components/LocationUI.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

export default class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      targeted: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ targeted: true });
  };

  handleMouseLeave = () => {
    this.setState({ targeted: false });
  };

  render() {
    const { locationID, x, y, heightRatio, tile, entity } = {
      ...this.props,
    };
    const { targeted } = { ...this.state };

    const pixelCoordinates = hex.pixelCoordinates([x, y]);
    const viewBox = `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`;

    return (
      <div
        className="location"
        style={{
          left: `${(styles.padding + pixelCoordinates[0] - hex.width) / styles.width * 100}%`,
          top: `${(styles.padding + pixelCoordinates[1] - hex.height) / styles.height * 100}%`,
        }}
      >
        <style jsx global>{`
          .location {
            position: absolute;
            width: ${hex.width / styles.width * 300}%;
            height: ${hex.height / styles.height * 300}%;
          }

          .target {
            pointer-events: all;
            touch-action: manipulation;
            opacity: 0;
            cursor: pointer;
          }

          .target:hover, .target:focus {
            stroke: ${styles.white};
            opacity: 1;
          }
        `}</style>

        {entity &&
          <SVG viewBox={viewBox} style={{ zIndex: y + 10 }}>
            <Layer heightRatio={heightRatio}>
              <text fill={styles.rock} x={hex.width / 2} y={hex.height / 2}>
                E
              </text>
            </Layer>
            <Layer heightRatio={heightRatio} zOffset={-2}>
              <text fill={styles.white} x={hex.width / 2} y={hex.height / 2}>
                E
              </text>
            </Layer>
          </SVG>}

        <SVG viewBox={viewBox}>
          <polygon
            className="target"
            stroke={styles.white}
            fill="none"
            points={hex.baseHexCoordinates}
            vectorEffect="non-scaling-stroke"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
        </SVG>

        {targeted && <LocationUI target={this.props} />}
      </div>
    );
  }
}
