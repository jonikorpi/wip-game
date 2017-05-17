import React, { PureComponent } from "react";

import Layer from "../components/Layer.js";
import Ground from "../components/Ground.js";
import Ridge from "../components/Ridge.js";
import WaterLine from "../components/WaterLine.js";
import Reflection from "../components/Reflection.js";
import Water from "../components/Water.js";
import Entity from "../components/Entity.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Tile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { targeted: false };
  }

  target = () => {
    this.setState({ targeted: true });
  };

  untarget = () => {
    this.setState({ targeted: false });
  };

  render() {
    const { x, y, zIndex, top, left, tile, unit, visible } = {
      ...this.props,
    };
    const { targeted } = { ...this.state };
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

    return (
      <div
        className="tile"
        style={{
          height: hex.height * hex.renderingSize + hex.unit,
          width: hex.width * hex.renderingSize + hex.unit,
          left: left * hex.renderingSize + hex.unit,
          top: top * hex.renderingSize + hex.unit,
        }}
      >
        <style jsx>{`
          .tile {
            position: absolute;
            {/*outline: 1px solid;*/}
          }

          .tileTarget {
            position: absolute;
            left: 0;
            width: 100%;
            pointer-events: all;
            overflow: hidden;
            cursor: pointer;
            opacity: 0;
            outline: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            outline: 1px solid;
          }

          .tileTarget:hover,
          .tileTarget:focus {
            opacity: 1;
          }
        `}</style>

        {visible &&
          <Layer style={{ zIndex: 1 }} className="water">
            <Water visible={visible} seed={seed++} points={points} />
          </Layer>}

        {tile.walkable &&
          <div>
            <Layer style={{ zIndex: 2 }} className="reflection">
              <Reflection visible={visible} seed={seed++} points={points} />
            </Layer>

            <Layer style={{ zIndex: 3 }} className="waterLine">
              <WaterLine visible={visible} seed={seed++} points={points} />
            </Layer>

            <Layer style={{ zIndex: 4 }} className="ridge">
              <Ridge visible={visible} seed={seed++} points={points} />
            </Layer>

            <Layer style={{ zIndex: 5 }} className="ground">
              <Ground visible={visible} seed={seed++} points={points} />
            </Layer>
          </div>}

        {unit &&
          visible &&
          <Layer zIndex={6} className="unit">
            <Entity {...unit} x={hex.width / 2} y={hex.height / 2} />
          </Layer>}

        <button
          className="tileTarget"
          style={{
            zIndex: zIndex,
            top: `${hex.height * hex.renderingSize * 0.125}${hex.unit}`,
            height: `${hex.height * hex.renderingSize * 0.75}${hex.unit}`,
          }}
          //onMouseEnter={this.target}
          //onMouseLeave={this.untarget}
          //onClick={this.randomizeTile}
          // TODO: handle tapping vs. colliding with scroll
          // onTouchStart={this.handleTouchStart}
          // onTouchEnd={this.handleTouchEnd}
          // onTouchCancel={this.handleTouchCancel}
          // onTouchMove={this.handleTouchMove}
        >
          {tile.name} {unit && unit.name}<br />
          <code className="tileCoordinates">{x},{y}</code>
        </button>
      </div>
    );
  }
}
