import React, { PureComponent } from "react";

import Tile from "../components/Tile.js";
import SVG from "../components/SVG.js";
import Ground from "../components/Ground.js";
import Ridge from "../components/Ridge.js";
import WaterLine from "../components/WaterLine.js";
import OuterWaterLine from "../components/OuterWaterLine.js";
import Reflection from "../components/Reflection.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import maths from "../helpers/maths.js";

const xPixelOffset = hex.perRow * 0.5;
const cellPaddingX = hex.width * (hex.perRow / 2) + hex.width;
const cellPaddingY = hex.height * 2;

export default class Container extends PureComponent {
  render() {
    const { cellX, cellY } = { ...this.props };
    const xOffset = cellY % 2 === 0 ? 0 : hex.perRow * 0.5;
    let zIndex = 1;

    const svgStyle = {
      left: -cellPaddingX * hex.renderingSize + hex.unit,
      right: -cellPaddingX * hex.renderingSize + hex.unit,
      top: -cellPaddingY * hex.renderingSize + hex.unit,
      bottom: -cellPaddingY * hex.renderingSize + hex.unit,
    };

    const svgViewBox = `${-cellPaddingX} ${-cellPaddingY} ${hex.cellWidth / hex.renderingSize + cellPaddingX * 2} ${hex.cellHeight / hex.renderingSize + cellPaddingY * 2}`;

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
        zIndex: cellY + coordinates[1],
        tile: tiles.getRandomTile(),
      };
    });

    const groundTileList = tileList.filter(tile => {
      return !tile.tile.sailable;
    });

    const groundTileListWithCoordinates = groundTileList.map(tile => {
      let seed = (tile.x || 1) * (tile.y || 2);

      tile.hexPoints = hex.baseHexCoordinates.map(point => {
        return [
          point[0] +
            maths.random(hex.randomRange, seed++) *
              (point[0] < hex.width / 2 ? -1 : 1),
          point[1] +
            maths.random(hex.randomRange, seed++) *
              (point[1] < hex.height / 2 ? -0.5 : 0.5),
        ];
      });

      return tile;
    });

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
            {/*border: 2px solid;*/}
          }
        `}</style>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          {groundTileListWithCoordinates.map(tile => {
            return <Reflection {...tile} />;
          })}
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          {groundTileListWithCoordinates.map(tile => {
            return <OuterWaterLine {...tile} />;
          })}
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          {groundTileListWithCoordinates.map(tile => {
            return <WaterLine {...tile} />;
          })}
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          {groundTileListWithCoordinates.map(tile => {
            return <Ridge {...tile} />;
          })}
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          {groundTileListWithCoordinates.map(tile => {
            return <Ground {...tile} />;
          })}
        </SVG>

        {tileList.map(tile => {
          return <Tile {...tile} />;
        })}
      </div>
    );
  }
}
