import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";

const random = (number = 1, seed = 1) => {
  const rand = Math.sin(seed) * 10000;
  return Math.abs((rand - Math.floor(rand)) * number);
};

export default class Tile extends PureComponent {
  constructor(props) {
    super(props);

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
    let tileKeys = Object.keys(tiles);
    return tileKeys[Math.floor(Math.random() * tileKeys.length)];
  };

  render() {
    const { x, y, zIndex, top, left } = {
      ...this.props,
    };
    const { targeted, tile } = { ...this.state };

    let seed = (x || 1) * (y || 2);

    const hexPointCoordinates = [
      [hex.width / 3, hex.height / 12],
      [hex.width / 2, 0],
      [hex.width / 3 * 2, hex.height / 12],

      [hex.width / 8 * 7, hex.height / 5],
      [hex.width, hex.height / 4],
      [hex.width, hex.height / 3],

      [hex.width, hex.height * 0.666],
      [hex.width, hex.height * 0.75],
      [hex.width / 8 * 7, hex.height / 5 * 4],

      [hex.width / 8 * 5, hex.height / 13 * 12],
      [hex.width / 2, hex.height],
      [hex.width / 8 * 3, hex.height / 13 * 12],

      [hex.width / 8, hex.height / 5 * 4],
      [0, hex.height * 0.75],
      [0, hex.height * 0.666],

      [0, hex.height / 3],
      [0, hex.height / 4],
      [hex.width / 8, hex.height / 5],
    ];

    const randomRange = hex.size / 9;
    const horizontalPadding = hex.width / 4;
    const verticalPadding = hex.height / 4;
    const roundingWidth = hex.size / 10;
    const waterLineWidth = hex.size / 50;
    const waterLineTotalWidth = roundingWidth + waterLineWidth;

    const hexagonPoints = hexPointCoordinates.reduce((result, point) => {
      return (
        result +
        ` ${horizontalPadding + point[0] + random(randomRange, seed++) * (point[0] < hex.width / 2 ? -1 : 1)},${verticalPadding + point[1] + random(randomRange, seed++) * (point[1] < hex.height / 2 ? -0.5 : 0.5)}`
      );
    }, "");

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
            {/*background: url("/static/hex.svg") center center no-repeat;
            background-size: cover;*/}
          }

          .tileOutline {
            position: absolute;
            left: -${hex.width / 4}${hex.unit};
            top: -${hex.height / 4}${hex.unit};
            width: 150%;
            height: 150%;
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
            opacity: 0;
            outline: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            outline: 1px solid;
          }

          .tileTarget:hover,
          .tileTarget:focus {
            opacity: 1;
          }

          {/*.waterLine {
            animation: waterLine 1s linear infinite alternate;
          }

          @keyframes waterLine {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 13; }
          }*/}
        `}</style>

        <svg
          className="tileOutline"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox={`0 0 ${hex.width + horizontalPadding * 2} ${hex.height + verticalPadding * 2}`}
          style={{ zIndex: zIndex - 20 }}
        >
          <polygon
            className="waterLine"
            stroke={tile === "water" ? "none" : styles.white}
            strokeWidth={waterLineTotalWidth}
            transform={`translate(0, ${waterLineWidth})`}
            strokeLinejoin="round"
            strokeDasharray="5, 0.25, 3, 0.5, 5, 0.333"
            strokeDashoffset={seed % 100}
            fill="none"
            points={hexagonPoints}
          />
        </svg>

        <svg
          className="tileOutline"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox={`0 0 ${hex.width + horizontalPadding * 2} ${hex.height + verticalPadding * 2}`}
          style={{ zIndex: zIndex - 10 }}
        >
          <polygon
            stroke={tile === "water" ? "none" : styles.black}
            strokeWidth={roundingWidth}
            strokeLinejoin="round"
            fill={tile === "water" ? "none" : styles.black}
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
          {/*{tile}<br />*/}
          <code className="tileCoordinates">{x},{y}<br />({seed})</code>
        </button>
      </div>
    );
  }
}
