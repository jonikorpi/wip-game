import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";
import Reflection from "../components/Reflection";
import Beach from "../components/Beach";
import Ground from "../components/Ground";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Location extends React.PureComponent {
  handleMouseEnter = () => {
    this.props.setTargetedLocation(this.props.locationID);
  };

  handleMouseLeave = () => {
    this.props.setTargetedLocation(null);
  };

  render() {
    const { x, y, heightRatio, landscape, tile, entity, regionSeed } = {
      ...this.props,
    };
    const [pixelX, pixelY] = hex.pixelCoordinates([x, y]);
    const pixelCoordinates = landscape ? [pixelX, pixelY] : [-pixelY, pixelX];
    const viewBox = landscape
      ? `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`
      : `${-hex.height} ${-hex.width} ${hex.height * 3} ${hex.width * 3}`;
    let seed = regionSeed + maths.getSeed(x, y);

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
      <div
        className="location"
        style={{
          left: landscape
            ? `${(styles.padding + pixelCoordinates[0] - hex.width) / styles.width * 100}%`
            : `${(styles.padding + pixelCoordinates[0] - hex.height) / styles.height * 100 + 75}%`,
          top: landscape
            ? `${(styles.padding + pixelCoordinates[1] - hex.height) / styles.height * 100}%`
            : `${(styles.padding + pixelCoordinates[1] - hex.width) / styles.width * 100}%`,
          width: landscape
            ? `${hex.width / styles.width * 300}%`
            : `${hex.height / styles.height * 300}%`,
          height: landscape
            ? `${hex.height / styles.height * 300}%`
            : `${hex.width / styles.width * 300}%`,
        }}
      >
        <style jsx global>{`
          .location {
            position: absolute;
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

        {tile.walkable &&
          <div className="terrain">
            <SVG viewBox={viewBox} style={{ zIndex: 1 }}>
              <Layer
                heightRatio={heightRatio}
                rotate={!landscape && 90}
                zOffset={5}
              >
                <Reflection points={points} />
              </Layer>
            </SVG>
            <SVG viewBox={viewBox} style={{ zIndex: 2 }}>
              <Layer
                heightRatio={heightRatio}
                rotate={!landscape && 90}
                zOffset={1}
              >
                <Beach points={points} />
              </Layer>
            </SVG>
            <SVG viewBox={viewBox} style={{ zIndex: 3 }}>
              <Layer heightRatio={heightRatio} rotate={!landscape && 90}>
                <Ground points={points} />
              </Layer>
            </SVG>
          </div>}

        {entity &&
          <SVG viewBox={viewBox} style={{ zIndex: 5 + y }}>
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
