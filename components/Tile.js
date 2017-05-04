import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";

const hexPointCoordinates = [
  [hex.width / 2, 0],
  [hex.width, hex.height / 4],
  [hex.width, hex.height * 0.75],
  [hex.width / 2, hex.height],
  [0, hex.height * 0.75],
  [0, hex.height / 4],
  [hex.width / 2, 0],
];

const viewboxX1 = hexPointCoordinates.reduce((result, point) => {
  return Math.min(result, point[0]);
}, hex.size);

const viewboxY1 = hexPointCoordinates.reduce((result, point) => {
  return Math.min(result, point[1]);
}, hex.size);

const viewboxX2 = hexPointCoordinates.reduce((result, point) => {
  return Math.max(result, point[0] + Math.abs(viewboxX1));
}, 0);

const viewboxY2 = hexPointCoordinates.reduce((result, point) => {
  return Math.max(result, point[1] - Math.abs(viewboxY1));
}, 0);

const hexagonPoints = hexPointCoordinates.reduce((result, point) => {
  return result + ` ${point[0]},${point[1]}`;
}, "");

export default class Tile extends PureComponent {
  constructor(props) {
    super(props);

    this.seed = (props.x || 1) * (props.y || 2);
    this.state = { targeted: false, tile: this.getRandomTile() };
  }

  target = () => {
    this.setState({ targeted: true });
  };

  untarget = () => {
    this.setState({ targeted: false });
  };

  randomizeTile = () => {
    this.setState({ tile: this.getRandomTile() });
  };

  getRandomTile = () => {
    const tileKeys = Object.keys(tiles);
    return tileKeys[Math.floor(Math.random() * tileKeys.length)];
  };

  render() {
    const { x, y, zIndex, top, left } = {
      ...this.props,
    };
    const { targeted, tile } = { ...this.state };

    return (
      <div
        className="tile"
        style={{
          height: hex.height + hex.unit,
          width: hex.width + hex.unit,
          left: left + hex.unit,
          top: top + hex.unit,
        }}
      >
        <style jsx global>{`
          .tile {
            position: absolute;
            background: url("/static/hex.svg") center center no-repeat;
            background-size: cover;
          }

          .tileOutline {
            width: 100%;
          }

          .tileTarget {
            position: absolute;
            left: 0;
            top: ${hex.height * 0.125}${hex.unit};
            height: ${hex.height * 0.75}${hex.unit};
            width: 100%;
            pointer-events: all;
            overflow: hidden;
            cursor: pointer;
            {/*opacity: 0;*/}
            outline: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            {/*outline: 1px solid;*/}
          }

          .tileTarget:hover,
          .tileTarget:focus {
            opacity: 1;
          }
        `}</style>

        <svg
          className="tileOutline"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox={`${viewboxX1} ${viewboxY1} ${viewboxX2} ${viewboxY2}`}
        >
          <polygon
            stroke={targeted ? styles.white : "none"}
            fill={tile === "water" ? "none" : styles.black}
            strokeWidth={hex.width / 62}
            points={hexagonPoints}
          />
        </svg>

        <button
          className="tileTarget"
          style={{ zIndex: zIndex }}
          onMouseEnter={this.target}
          onMouseLeave={this.untarget}
          onClick={this.randomizeTile}
          // TODO: handle tapping vs. colliding with scroll
          // onTouchStart={this.handleTouchStart}
          // onTouchEnd={this.handleTouchEnd}
          // onTouchCancel={this.handleTouchCancel}
          // onTouchMove={this.handleTouchMove}
        >
          {tile}<br />
          <code className="tileCoordinates">{x},{y}</code>
        </button>
      </div>
    );
  }
}
