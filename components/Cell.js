import React, { Component } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";

export default class Cell extends Component {
  render() {
    const { style, cellCoordinates } = { ...this.props };

    return (
      <div
        className="cell"
        style={{
          color: `hsl(${cellCoordinates[0] * cellCoordinates[1] % 360}, 50%, 50%)`,
          ...style,
        }}
      >
        <style jsx global>{`
          .cell {
            pointer-events: none;
            outline: 1px solid;
          }
        `}</style>

        {[...Array(hex.hexesPerRow * hex.hexesPerColumn).keys()].map(index => {
          const xOffset = cellCoordinates[1] % 2 === 0
            ? 0
            : hex.hexesPerRow * 0.5;
          const xPixelOffset = hex.hexesPerRow * -0.5;

          const y = Math.floor(index / hex.hexesPerColumn);
          const x = index % hex.hexesPerRow + xOffset;

          const coordinates = [
            x + cellCoordinates[0] * hex.hexesPerRow,
            y + cellCoordinates[1] * hex.hexesPerColumn,
          ];
          const pixelCoordinates = hex.pixelCoordinates([x + xPixelOffset, y]);

          return (
            <Tile
              key={index}
              x={coordinates[0]}
              y={coordinates[1]}
              style={{
                height: hex.height,
                width: hex.width,
                x: pixelCoordinates[0],
                y: pixelCoordinates[1],
              }}
              zIndex={cellCoordinates + coordinates[1]}
            />
          );
        })}
      </div>
    );
  }
}
