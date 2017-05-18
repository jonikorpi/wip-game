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

export default class Hero extends PureComponent {
  render() {
    const { x, y, zIndex, top, left } = {
      ...this.props,
    };
    let seed = (x || 123) * (y || 456) * (x || 123);

    return (
      <div
        className="hero"
        style={{
          height: hex.height * hex.renderingSize + hex.unit,
          width: hex.width * hex.renderingSize + hex.unit,
          left: (left - hex.width / 2) * hex.renderingSize + hex.unit,
          top: (top - hex.height / 2) * hex.renderingSize + hex.unit,
        }}
      >
        <style jsx>{`
          .hero {
            position: absolute;
            {/*outline: 1px solid;*/}
          }
        `}</style>

        <Layer style={{ zIndex: 5 }} className="hero">
          <Entity
            type={"human"}
            x={(0.5 + maths.random(1, seed)) * hex.width / 2}
            y={(0.5 + maths.random(1, seed)) * hex.height / 2}
            seed={seed++}
          />
        </Layer>
      </div>
    );
  }
}
