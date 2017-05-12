import React, { Component } from "react";

import Layer from "../components/Layer.js";
import Grounds from "../components/Grounds.js";
import Ridges from "../components/Ridges.js";
import WaterLines from "../components/WaterLines.js";
import Reflections from "../components/Reflections.js";
import Tile from "../components/Tile.js";
import Entity from "../components/Entity.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import units from "../helpers/units.js";
import maths from "../helpers/maths.js";

export default class Container extends Component {
  render() {
    const { cellX, cellY } = { ...this.props };
    const xPixelOffset = cellY % 2 === 0 ? 0 : hex.perRow / 2;
    let seed = (cellX || 123) * (cellY || 456);
    let zIndex = 1;

    // TODO: check tile type, fetch it from tiles.js, overwrite with DB values
    // but maybe only in the tooltip/targeting component.
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

    const unitList = tileList.map(tile => {
      return tile.unit ? tile : null;
    });

    const drawableTiles = tileList.filter(tile => {
      return tile.tile.type !== "water";
    });

    const waterTiles = drawableTiles.filter(tile => {
      return tile.tile.sailable;
    });

    const groundTiles = drawableTiles
      .filter(tile => {
        return tile.tile.walkable;
      })
      .map(tile => {
        let tileSeed = (tile.x || 123) * (tile.y || 456);
        const hexPoints = hex.baseHexCoordinates.map(point => {
          return [
            point[0] +
              maths.random(hex.randomRange, tileSeed++) *
                (point[0] < hex.width / 2 ? -1 : 1),
            point[1] +
              maths.random(hex.randomRange, tileSeed++) *
                (point[1] < hex.height / 2 ? -0.5 : 0.5),
          ];
        });

        return {
          hexPoints: hexPoints,
          left: tile.left,
          top: tile.top,
        };
      });

    return (
      <div
        className="container"
        style={{
          color: `hsl(${seed % 360}, 50%, 50%)`,
        }}
      >
        <Layer zIndex={zIndex++} className="reflections">
          <Reflections tiles={groundTiles} />
        </Layer>

        <Layer zIndex={zIndex++} className="waterLines">
          <WaterLines tiles={groundTiles} />
        </Layer>

        <Layer zIndex={zIndex++} className="ridges">
          <Ridges tiles={groundTiles} />
        </Layer>

        <Layer zIndex={zIndex++} className="grounds">
          <Grounds tiles={groundTiles} />
        </Layer>

        <Layer zIndex={zIndex++} className="units">
          {unitList.map((tile, index) => {
            return tile
              ? Entity({
                  key: tile.key,
                  ...tile.unit,
                  x: tile.left + hex.width * hex.renderingSize,
                  y: tile.top + hex.height * hex.renderingSize,
                })
              : null;
          })}
        </Layer>

        <div className="tiles">
          {tileList.map(tile => {
            return Tile({ ...tile });
          })}
        </div>
      </div>
    );
  }
}
