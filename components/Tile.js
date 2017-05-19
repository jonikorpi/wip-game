import React, { PureComponent } from "react";

import Layer from "../components/Layer.js";
import Ground from "../components/Ground.js";
import Ridge from "../components/Ridge.js";
import WaterLine from "../components/WaterLine.js";
import Reflection from "../components/Reflection.js";
import Water from "../components/Water.js";
import Entity from "../components/Entity.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Tile extends PureComponent {
  render() {
    // typeof window !== "undefined" && console.count("tile rendered");

    const { x, y, zIndex, top, left, entity, visible, ...tile } = {
      ...this.props,
    };
    let seed = (x || 123) * (y || 456) * (x || 123);

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

    const transform = maths.calculateTransform(left, top, hex);

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
          <Layer style={{ zIndex: 1 }} className="water">
            <Water visible={visible} seed={seed++} points={points} />
          </Layer>}*/}

        {tile.walkable &&
          <div>
            <Layer
              style={{
                WebkitTransform: transform,
                transform: transform,
                zIndex: 2,
              }}
              className="reflection"
            >
              <Reflection visible={visible} seed={seed++} points={points} />
            </Layer>

            <Layer
              style={{
                WebkitTransform: transform,
                transform: transform,
                zIndex: 3,
              }}
              className="waterLine"
            >
              <WaterLine visible={visible} seed={seed++} points={points} />
            </Layer>

            <Layer
              style={{
                WebkitTransform: transform,
                transform: transform,
                zIndex: 4,
              }}
              className="ridge"
            >
              <Ridge visible={visible} seed={seed++} points={points} />
            </Layer>

            <Layer
              style={{
                WebkitTransform: transform,
                transform: transform,
                zIndex: 5,
              }}
              className="ground"
            >
              <Ground visible={visible} seed={seed++} points={points} />
            </Layer>
          </div>}

        {entity &&
          <Layer
            style={{
              transform: transform,
              WebkitTransform: transform,
              zIndex: 6,
            }}
            className="entity"
          >
            <Entity visible={visible} type={entity} x={0} y={0} seed={seed++} />
          </Layer>}
      </div>
    );
  }
}
