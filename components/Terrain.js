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
    const { locations, regionCoordinates } = { ...this.props };

    const points = locations.map(locationID => {
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

    const viewBox = `0 ${hex.height * -1 / 16} ${hex.width * (hex.perRegionAxis + 0.5)} ${hex.height * (hex.perRegionAxis + 3 / 4) * 3 / 4}`;
    let zIndex = 1;

    return (
      <div className="terrain">
        <style jsx global>{`
          .terrain {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
        `}</style>

        <Layer viewBox={viewBox} zIndex={zIndex++} zOffset={2}>
          <Reflection points={points} />
        </Layer>

        <Layer viewBox={viewBox} zIndex={zIndex++} zOffset={1}>
          <WaterLine points={points} />
        </Layer>

        <Layer viewBox={viewBox} zIndex={zIndex++} zOffset={1}>
          <Beach points={points} />
        </Layer>

        <Layer viewBox={viewBox} zIndex={zIndex++}>
          <Ground points={points} />
        </Layer>
      </div>
    );
  }
}
