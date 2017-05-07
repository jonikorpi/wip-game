import React, { PureComponent } from "react";

import Ground from "../components/Ground";
import Rocks from "../components/Rocks";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

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
    let tile = this.getRandomTile();

    while (tile === this.state.tile) {
      tile = this.getRandomTile();
    }

    this.setState({ tile: tile });
  };

  getRandomTile = () => {
    const tileKeys = Object.keys(tiles);
    const tile = tileKeys[Math.floor(Math.random() * tileKeys.length)];
    return tiles[tile];
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
          height: hex.height * hex.renderingSize + hex.unit,
          width: hex.width * hex.renderingSize + hex.unit,
          left: left * hex.renderingSize + hex.unit,
          top: top * hex.renderingSize + hex.unit,
        }}
      >
        <style jsx>{`
          .tile {
            position: absolute;
            {/*background: url("/static/hex.svg") center center no-repeat;
            background-size: cover;*/}
          }

          .tileTarget {
            position: absolute;
            left: 0;
            top: ${hex.height * hex.renderingSize * 0.125}${hex.unit};
            height: ${hex.height * hex.renderingSize * 0.75}${hex.unit};
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
        `}</style>

        {!tile.sailable && <Ground x={x} y={y} zIndex={zIndex} />}
        {/*{tile.sailable &&
          tile.difficult &&
          <Rocks x={x} y={y} zIndex={zIndex} />}*/}

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
          {tile.name}<br />
          <code className="tileCoordinates">{x},{y}</code>
        </button>
      </div>
    );
  }
}
