import React, { Component } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";
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
    const playerPosition = [0, 0];
    const visionRange = 3;
    const renderRange = 10;

    const tileList = hex.hexesWithin(playerPosition, renderRange).map(tile => {
      const x = tile[0];
      const y = tile[1];

      const pixelCoordinates = hex.pixelCoordinates([x, y]);

      return {
        key: `${x},${y}`,
        x: x,
        y: y,
        left: pixelCoordinates[0],
        top: pixelCoordinates[1],
        zIndex: y + 100000,
        visible: hex.distanceBetween(playerPosition, tile) <= visionRange,
        tile: tiles.getRandomTile(x * y),
        unit: maths.random(1, x * y) > 0.75 ? units["default"] : null,
      };
    });

    return (
      <div id="game">
        <style jsx>{`
          #game {
            height: 200vh;
          }

          #viewport {
            position: fixed;
            left: 0; top: 0;
            width: 100vw;
            height: 100vh;
          }

          #origo {
            position: absolute;
            left: 50%; top: 50%;
            width: 0;
            height: 0;
            margin-left: -${hex.width / 2 * hex.renderingSize + hex.unit};
            margin-top: -${hex.height / 2 * hex.renderingSize + hex.unit};
          }
        `}</style>

        <div id="viewport">
          <div id="origo">
            {tileList.map(tile => {
              return <Tile {...tile} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
