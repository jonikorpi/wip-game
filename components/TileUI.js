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

export default class TileUI extends PureComponent {
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
    const {
      x,
      y,
      zIndex,
      top,
      left,
      entity,
      visible,
      playerIsHere,
      ...tile
    } = {
      ...this.props,
    };
    const { targeted } = { ...this.state };

    const transform = maths.calculateTransform(left, top, hex);

    return (
      <div
        className="tileUI"
        style={{
          WebkitTransform: transform,
          transform: transform,
          opacity: targeted || playerIsHere ? 1 : 0,
          zIndex: zIndex,
        }}
      >
        <style jsx>{`
          .tileUI {
            position: absolute;
            left: 0; top: 0;
            height: ${hex.height * hex.renderingSize + hex.unit};
            width: ${hex.width * hex.renderingSize + hex.unit};
          }

          .tileTarget {
            position: relative;
            top: ${hex.height * hex.renderingSize * 0.125}${hex.unit};
            height: ${hex.height * hex.renderingSize * 0.75}${hex.unit};
            width: 100%;
            pointer-events: all;
            overflow: hidden;
            cursor: pointer;
            outline: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            outline: 1px solid;
          }
        `}</style>

        <button
          className="tileTarget"
          onMouseEnter={this.target}
          onMouseLeave={this.untarget}
          //onClick={this.randomizeTile}
          // TODO: handle tapping vs. colliding with scroll
          // onTouchStart={this.handleTouchStart}
          // onTouchEnd={this.handleTouchEnd}
          // onTouchCancel={this.handleTouchCancel}
          // onTouchMove={this.handleTouchMove}
        >
          {tile.name} {entity} {tile.heroes[0] && "hero"}<br />
          <code className="tileCoordinates">{x},{y}</code>
        </button>
      </div>
    );
  }
}
