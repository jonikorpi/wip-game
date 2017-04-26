import React, { Component } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";

const hexesPerCell = 10;

export default class Cell extends Component {
  render() {
    const { style, index } = { ...this.props };

    return (
      <div
        className="cell"
        style={{
          color: `hsl(${index}, 50%, 50%)`,
          ...style,
        }}
      >
        <style jsx global>{`
          .cell {
            pointer-events: none;
            outline: 1px solid;
          }
        `}</style>

        {[...Array(hexesPerCell * hexesPerCell).keys()].map(index => {
          const y = Math.floor(index / hexesPerCell);
          const x = index % hexesPerCell;

          const coordinates = hex.pixelCoordinates([x, y]);

          return (
            <Tile
              key={index}
              x={x}
              y={y}
              style={{
                height: hex.height,
                width: hex.width,
                x: coordinates[0],
                y: coordinates[1],
              }}
            />
          );
        })}
      </div>
    );
  }
}
