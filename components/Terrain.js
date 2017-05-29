import React from "react";

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

    return (
      <svg
        className="terrain"
        shapeRendering="optimizeSpeed"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 ${hex.height * -1 / 16} ${hex.width * (hex.perRegionAxis + 0.5)} ${hex.height * (hex.perRegionAxis + 3 / 4) * 3 / 4}`}
        // preserveAspectRatio="none"
      >
        <style jsx global>{`
          .terrain {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
        `}</style>

        <Reflection points={points} />
        <WaterLine points={points} />
        <Beach points={points} />
        <Ground points={points} />
      </svg>
    );
  }
}
