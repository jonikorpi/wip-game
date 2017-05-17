import React, { Component } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import units from "../helpers/units.js";
import maths from "../helpers/maths.js";

export default class Container extends Component {
  render() {
    const { cellX, cellY } = { ...this.props };
    const xPixelOffset = cellY % 2 === 0 ? 0 : hex.perRow / 2;
    let seed = (cellX || 123) * (cellY || 456);

    const tileList = [...Array(hex.perCell).keys()].map(index => {
      const y = Math.floor(index / hex.perColumn);
      const x = index % hex.perRow;

      const coordinates = [x + cellX * hex.perRow, y + cellY * hex.perColumn];
      const pixelCoordinates = hex.pixelCoordinates([x - xPixelOffset, y]);

      return {
        key: `${coordinates[0]},${coordinates[1]}`,
        index: index,
        x: coordinates[0],
        y: coordinates[1],
        left: pixelCoordinates[0],
        top: pixelCoordinates[1],
        zIndex: cellY + coordinates[1] + 100000,
        tile: tiles.getRandomTile(seed++),
        unit: Math.random() > 0.9 ? units["default"] : null,
      };
    });

    return (
      <div
        className="container"
        style={{
          color: `hsl(${seed % 360}, 50%, 50%)`,
        }}
      >
        <style jsx>{`
          .container {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            /*border: 2px solid;*/
          }
        `}</style>

        {tileList.map(tile => {
          return <Tile {...tile} />;
        })}
      </div>
    );
  }
}
