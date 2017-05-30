import React from "react";

import Layer from "../components/Layer";
import Reflection from "../components/Reflection";
import WaterLine from "../components/WaterLine";
import Beach from "../components/Beach";
import Ground from "../components/Ground";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";

export default class Terrain extends React.PureComponent {
  render() {
    const { terrainList, regionCoordinates, heightRatio } = { ...this.props };

    if (!terrainList || terrainList.length === 0) {
      return null;
    }

    const points = terrainList.map(locationID => {
      const location = locationID.split(",");
      const x = +location[0];
      const y = +location[1];
      const pixelCoordinates = hex.pixelCoordinates([x, y]);

      let locationSeed = maths.getSeed([
        x + regionCoordinates[0],
        y + regionCoordinates[1],
      ]);

      return hex.baseHexCoordinates.map(point => {
        return [
          pixelCoordinates[0] +
            point[0] +
            maths.random(hex.randomRange, locationSeed++) *
              (point[0] < hex.width / 2 ? -1 : 1),
          pixelCoordinates[1] +
            point[1] +
            maths.random(hex.randomRange, locationSeed++) *
              (point[1] < hex.height / 2 ? -0.5 : 0.5),
        ];
      });
    });

    return (
      <g className="terrain">
        <Layer heightRatio={heightRatio} zOffset={10}>
          <Reflection points={points} />
        </Layer>

        <Layer heightRatio={heightRatio} zOffset={2}>
          <WaterLine points={points} />
        </Layer>

        <Layer heightRatio={heightRatio} zOffset={2}>
          <Beach points={points} />
        </Layer>

        <Layer heightRatio={heightRatio}>
          <Ground points={points} />
        </Layer>
      </g>
    );
  }
}
