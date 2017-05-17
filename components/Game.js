import React, { Component } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import units from "../helpers/units.js";
import maths from "../helpers/maths.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static async getInitialProps({ req }) {
    return {};
  }

  render() {
    let seed = 123 * 456;
    const tileList = [...Array(hex.perCell).keys()].map(index => {
      const y = Math.floor(index / hex.perColumn);
      const x = index % hex.perRow;

      const pixelCoordinates = hex.pixelCoordinates([x, y]);

      return {
        key: `${x},${y}`,
        index: index,
        x: x,
        y: y,
        left: pixelCoordinates[0],
        top: pixelCoordinates[1],
        zIndex: y + 100000,
        tile: tiles.getRandomTile(seed++),
        unit: Math.random() > 0.9 ? units["default"] : null,
      };
    });

    return (
      <div id="game">
        <style jsx>{`
          #game {
            height: 100vh;
          }
        `}</style>

        {tileList.map(tile => {
          return <Tile {...tile} />;
        })}
      </div>
    );
  }
}
