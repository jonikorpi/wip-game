import React, { PureComponent } from "react";

import Layer from "../components/Layer.js";
import Grounds from "../components/Grounds.js";
import Ridges from "../components/Ridges.js";
import WaterLines from "../components/WaterLines.js";
import Reflections from "../components/Reflections.js";
import Tile from "../components/Tile.js";
import Entity from "../components/Entity.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import maths from "../helpers/maths.js";

const xPixelOffset = hex.perRow * 0.5;

export default class Container extends PureComponent {
  render() {
    const { cellX, cellY } = { ...this.props };
    const xOffset = cellY % 2 === 0 ? 0 : hex.perRow * 0.5;
    let seed = (cellX || 123) * (cellY || 456);
    let zIndex = 1;

    const tileList = [...Array(hex.perCell).keys()].map(index => {
      const y = Math.floor(index / hex.perColumn);
      const x = index % hex.perRow + xOffset;

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
        tile: tiles.getRandomTile(),
      };
    });

    const groundTileList = tileList
      .filter(tile => {
        return !tile.tile.sailable;
      })
      .map(tile => {
        let tileSeed = (tile.x || 123) * (tile.y || 456);

        tile.hexPoints = hex.baseHexCoordinates.map(point => {
          return [
            point[0] +
              maths.random(hex.randomRange, tileSeed++) *
                (point[0] < hex.width / 2 ? -1 : 1),
            point[1] +
              maths.random(hex.randomRange, tileSeed++) *
                (point[1] < hex.height / 2 ? -0.5 : 0.5),
          ];
        });

        return tile;
      });

    return (
      <div
        className="container"
        style={{
          color: `hsl(${seed % 360}, 50%, 50%)`,
        }}
      >
        <style jsx global>{`
          .container {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            {/*border: 2px solid;*/}
          }

          .tiles {
            position: absolute;
          }
        `}</style>

        <Layer zIndex={zIndex++} className="reflections">
          <Reflections tiles={groundTileList} />
        </Layer>

        <Layer zIndex={zIndex++} className="waterLines">
          <WaterLines tiles={groundTileList} />
        </Layer>

        <Layer zIndex={zIndex++} className="ridges">
          <Ridges tiles={groundTileList} />
        </Layer>

        <Layer zIndex={zIndex++} className="grounds">
          <Grounds tiles={groundTileList} />
        </Layer>

        <Layer zIndex={zIndex++} className="units">
          {groundTileList.map((tile, index) => {
            return !tile.sailable && Math.random() > 0.5
              ? <Entity
                  key={index}
                  type="human"
                  x={tile.left + hex.width * hex.renderingSize}
                  y={tile.top + hex.height * hex.renderingSize}
                />
              : null;
          })}
        </Layer>

        <div className="tiles">
          {tileList.map(tile => {
            return <Tile {...tile} />;
          })}
        </div>
      </div>
    );
  }
}
