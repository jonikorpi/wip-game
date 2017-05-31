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
    const { locationID, x, y, heightRatio } = { ...this.props };
    const { targeted } = { ...this.state };
    let zIndex = 10;
    const pixelCoordinates = hex.pixelCoordinates([x, y]);

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

        <SVG
          viewBox={`${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`}
        >
          <polygon
            className="target"
            stroke={styles.white}
            fill="none"
            points={hex.baseHexCoordinates}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            vectorEffect="non-scaling-stroke"
          />
        </SVG>

        {targeted && <LocationUI target={this.props} />}
      </div>
    );
  }
}
