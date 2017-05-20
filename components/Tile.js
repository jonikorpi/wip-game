import React, { PureComponent } from "react";

import Layer from "../components/Layer.js";
import Ground from "../components/Ground.js";
import Beach from "../components/Beach.js";
import WaterLine from "../components/WaterLine.js";
import Reflection from "../components/Reflection.js";
import Water from "../components/Water.js";
import Entity from "../components/Entity.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

export default class Tile extends PureComponent {
  render() {
    const { x, y } = {
      ...this.props,
    };
    // const tileID = `${x},${y}`;
    const pixelCoordinates = hex.pixelCoordinates([x, y]);
    const left = pixelCoordinates[0];
    const top = -pixelCoordinates[1];
    // const zIndex = y + 2147483646 / 2;

    let seed = Math.abs((x || 123) * (y || 456) / (x || 123));
    const tileType = tileTypes.getRandomTile(x * y);
    const entityType = maths.random(1, x * y) > 0.95 && "mountain";
    // typeof window !== "undefined" && console.count("tile rendered");

    const heroes = !entityType &&
    tileType.walkable && [
      ...Array(Math.floor(maths.random(10, seed++))).keys(),
    ];

    const points = hex.baseHexCoordinates.map(point => {
      return [
        point[0] +
          maths.random(hex.randomRange, seed++) *
            (point[0] < hex.width / 2 ? -1 : 1),
        point[1] +
          maths.random(hex.randomRange, seed++) *
            (point[1] < hex.height / 2 ? -0.5 : 0.5),
      ];
    });

    return (
      <div className="tile">
        <style jsx>{`
          .tile {
            position: absolute;
            left: 0; top: 0;
            height: ${hex.height * hex.renderingSize + hex.unit};
            width: ${hex.width * hex.renderingSize + hex.unit};
            {/*outline: 1px solid;*/}
          }
        `}</style>

        {/*{visible &&
          <Layer
            <Water visible={true} seed={seed++} points={points} />
          </Layer>}*/}

        {tileType.walkable &&
          <Layer
            style={maths.getTransform(left, top, 2)}
            className="reflection"
          >
            <Reflection visible={true} seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={maths.getTransform(left, top, 3)} className="waterLine">
            <WaterLine visible={true} seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={maths.getTransform(left, top, 4)} className="beach">
            <Beach visible={true} seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={maths.getTransform(left, top, 5)} className="ground">
            <Ground visible={true} seed={seed++} points={points} />
          </Layer>}

        {entityType &&
          <Layer style={maths.getTransform(left, top, 6)} className="entity">
            <Entity
              type={entityType}
              x={0}
              y={0}
              visible={true}
              seed={seed++}
            />
          </Layer>}

        {heroes &&
          heroes.length > 0 &&
          <Layer style={maths.getTransform(left, top, 6)} className="heroes">
            {heroes.map(hero => (
              <Entity
                type="hero"
                x={hex.width * (maths.random(0.5, seed++) + 0.25)}
                y={hex.height * (maths.random(0.5, seed++) + 0.25)}
                visible={true}
                key={seed++}
                seed={seed++}
              />
            ))}

          </Layer>}
      </div>
    );
  }
}
