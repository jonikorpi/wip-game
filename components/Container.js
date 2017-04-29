import React, { PureComponent } from "react";

import Tile from "../components/Tile.js";

import hex from "../helpers/hex.js";

export default class Container extends PureComponent {
  componentDidUpdate() {
    console.log("container updated", this.props, this.state);
  }

  render() {
    const { cellX, cellY } = { ...this.props };

    return (
      <div
        className="container"
        style={{
          color: `hsl(${cellX * cellY % 360}, 50%, 50%)`,
        }}
      >
        <style jsx global>{`
          .container {
            width: 100%;
            height: 100%;
            pointer-events: none;
            {/*outline: 1px solid;*/}
          }
        `}</style>

        {[...Array(hex.perCell).keys()].map(index => {
          const xOffset = cellY % 2 === 0 ? 0 : hex.perRow * 0.5;
          const xPixelOffset = hex.perRow * -0.5;

          const y = Math.floor(index / hex.perColumn);
          const x = index % hex.perRow + xOffset;

          const coordinates = [
            x + cellX * hex.perRow,
            y + cellY * hex.perColumn,
          ];
          const pixelCoordinates = hex.pixelCoordinates([x + xPixelOffset, y]);

          return (
            <Tile
              key={index}
              index={index}
              x={coordinates[0]}
              y={coordinates[1]}
              left={pixelCoordinates[0]}
              top={pixelCoordinates[1]}
              zIndex={cellY + coordinates[1]}
            />
          );
        })}
      </div>
    );
  }
}
