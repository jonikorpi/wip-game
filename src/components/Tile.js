import React from "react";
import { Entity } from "aframe-react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";
import Beach from "../components/Beach";
import Ground from "../components/Ground";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";
import maths from "../helpers/maths.js";

export default class Tile extends React.PureComponent {
  handleMouseEnter = () => {
    this.props.setTargetedLocation(this.props.locationID);
  };

  handleMouseLeave = () => {
    this.props.setTargetedLocation(null);
  };

  render() {
    const { x, y, angle, landscape, regionSeed, walkable } = this.props;

    // const position = maths.getPositionerStyle(landscape, [x, y]);
    const [pixelX, pixelY] = hex.pixelCoordinates([x, y]);
    const position = { x: pixelX, z: pixelY, y: 0 };
    const viewBox = maths.getViewBox(landscape);
    let seed = regionSeed + maths.getSeed([x, y]);

    const points = hex.baseHexCoordinates.map(point => {
      return [
        point[0] +
          maths.random(hex.randomRange, seed++) *
            (point[0] < hex.width / 2 ? -1 : 1),
        point[1] +
          maths.random(hex.randomRange, seed++) *
            (point[1] < hex.height / 2 ? -0.5 : 0.5),
        0,
      ];
    });

    const targetPoints = hex.baseHexCoordinates.map(point => {
      return {
        x: point[0],
        z: point[1],
        y: 0,
      };
    });

    return (
      <Entity class="tile" position={position} rotation={{ x: 0, y: 0, z: 0 }}>
        {walkable &&
          <Entity>
            <Beach points={points} />
            <Ground points={points} />
          </Entity>}

        <Entity
          class="target"
          position={{ x: 0, y: 0.05, z: 0 }}
          faceset={{ vertices: targetPoints }}
          material={{
            color: styles.white,
            shader: "flat",
            wireframe: true,
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      </Entity>
    );
  }
}
