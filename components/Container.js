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
import styles from "../helpers/styles.js";

const xPixelOffset = hex.perRow * 0.5;
const cellPaddingX = hex.width * (hex.perRow / 2) + hex.width;
const cellPaddingY = hex.height * 2;

export default class Container extends PureComponent {
  render() {
    const { cellX, cellY } = { ...this.props };
    const xOffset = cellY % 2 === 0 ? 0 : hex.perRow * 0.5;
    let seed = (cellX || 123) * (cellY || 456);
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

          .waterLine {
            animation: waterLine 1s steps(2, start) infinite;
          }

          @keyframes waterLine {
            from { opacity: 1  }
            to { opacity: 0  }
          }
        `}</style>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          <g
            stroke={styles.reflection}
            strokeWidth={hex.roundingWidth}
            strokeLinejoin="round"
            fill={styles.reflection}
          >
            {groundTileListWithCoordinates.map(tile => {
              return <Reflection {...tile} />;
            })}
          </g>
        </SVG>

        <SVG
          style={{ ...svgStyle, zIndex: zIndex++ }}
          viewBox={svgViewBox}
          className="waterLine"
        >
          <g
            stroke={styles.wave}
            strokeWidth={hex.waterLineWidth}
            strokeLinejoin="round"
            strokeDasharray={`${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}`}
            fill="none"
          >
            {groundTileListWithCoordinates.map(tile => {
              return (
                <OuterWaterLine
                  {...tile}
                  offset={hex.outerWaterLineOffset + hex.waterLineWidth}
                />
              );
            })}
          </g>
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          <g
            stroke={styles.wave}
            strokeWidth={hex.waterLineWidth}
            strokeLinejoin="round"
            strokeDasharray={`${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}, ${0.5 * hex.outerWaveLength + maths.random(hex.outerWaveLength, seed++)}, ${0.5 * hex.outerWaveGap + maths.random(hex.outerWaveGap, seed++)}`}
            fill="none"
          >
            {groundTileListWithCoordinates.map(tile => {
              return (
                <OuterWaterLine {...tile} offset={hex.outerWaterLineOffset} />
              );
            })}
          </g>
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          <g
            stroke={styles.white}
            strokeWidth={hex.waterLineWidth + hex.roundingWidth}
            fill="none"
            strokeLinejoin="round"
            strokeDasharray={`${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}, ${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}, ${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}, ${hex.waveLength + maths.random(hex.waveLength, seed++)}, ${hex.waveGap + maths.random(hex.waveGap, seed++)}`}
          >
            {groundTileListWithCoordinates.map(tile => {
              return <WaterLine {...tile} />;
            })}
          </g>
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          <g
            stroke={styles.rock}
            strokeWidth={hex.roundingWidth}
            strokeLinejoin="round"
            fill={styles.rock}
          >
            {groundTileListWithCoordinates.map(tile => {
              return <Ridge {...tile} />;
            })}
          </g>
        </SVG>

        <SVG style={{ ...svgStyle, zIndex: zIndex++ }} viewBox={svgViewBox}>
          <g
            stroke={styles.black}
            strokeWidth={hex.roundingWidth}
            strokeLinejoin="round"
            fill={styles.black}
          >
            {groundTileListWithCoordinates.map(tile => {
              return <Ground {...tile} />;
            })}
          </g>
        </SVG>

        {tileList.map(tile => {
          return <Tile {...tile} />;
        })}
      </div>
    );
  }
}
