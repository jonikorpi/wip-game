import React, { Component } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { tileList, visionRange, playerPosition } = { ...this.props };

    const stateTiles = tileList.map(tile => {
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
        entity: maths.random(1, x * y) > 0.95 ? "mountain" : null,
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
          }
        `}</style>

        <div id="viewport">
          <div id="origo">
            {stateTiles.map(tile => {
              return <Tile {...tile} />;
            })}

            {/*Map heroes here too*/}
          </div>
        </div>
      </div>
    );
  }
}
