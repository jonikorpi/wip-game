import React, { PureComponent } from "react";
import CustomProperties from "react-custom-properties";

import Camera from "../components/Camera.js";
import WorldUI from "../components/WorldUI.js";
import Location from "../components/Location.js";

import hex from "../helpers/hex.js";

export default class World extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      targetedTile: null,
    };
  }

  targetTile = tile => {
    this.setState({ targetedTile: tile });
  };

  render() {
    const { tiles, visionRange, playerPosition, playerPixelCoordinates } = {
      ...this.props,
    };
    const { targetedTile } = { ...this.state };

    return (
      <div id="world">
        <WorldUI targetedTile={targetedTile} />

        <Camera playerPixelCoordinates={playerPixelCoordinates}>
          <CustomProperties
            properties={{
              "--playerX": playerPixelCoordinates[0],
              "--playerY": playerPixelCoordinates[1],
            }}
          >
            {tiles.map(tile => {
              return (
                <Location
                  key={`${tile[0]},${tile[1]}`}
                  x={tile[0]}
                  y={tile[1]}
                  targetTile={this.targetTile}
                  //visible={hex.distanceBetween(playerPosition, tile) <= visionRange}
                />
              );
            })}
          </CustomProperties>
        </Camera>
      </div>
    );
  }
}
