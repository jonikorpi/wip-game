import React from "react";

import RegionUI from "../components/RegionUI.js";
import Locations from "../components/Locations.js";
import Terrain from "../components/Terrain.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

const createFakeHeroes = () => {
  return [...Array(Math.floor(Math.random() * 10)).keys()].map(hero => {
    return Math.random() / 2;
  });
};

export default class Region extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      targetLocation: null,
      locations: null,
    };
  }

  componentDidMount() {
    const { coordinates } = { ...this.props };
    let seed = maths.getSeed(coordinates);

    this.setState({
      locations: hex
        .rectangleOfHexes(hex.perRegionAxis, hex.perRegionAxis)
        .reduce((locations, location) => {
          const [x, y] = location;

          const tileType = tiles.getRandomTile(seed++);
          const entity = maths.random(1, seed++) > 0.95 && "mountain";
          const heroes = !entity && tileType.walkable && createFakeHeroes();

          locations[`${location[0]},${location[1]}`] = {
            tile: tileType,
            entity: entity,
            heroes: heroes,
          };

          return locations;
        }, {}),
    });
  }

  targetLocation = locationID => {
    this.setState({ targetLocation: locationID });
  };

  render() {
    const { coordinates } = { ...this.props };
    const { targetLocation, locations } = { ...this.state };
    const padding = styles.padding * hex.size;

    const locationList = locations && Object.keys(locations);
    const terrainList =
      locationList &&
      locationList.filter(locationID => locations[locationID].tile.walkable);

    return (
      <div className="region">
        <style jsx global>{`
          .region {
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            pointer-events: none;
          }

          .svg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            max-height: ${styles.maxHeight * 100}vw;
            margin: auto;
          }
        `}</style>

        <svg
          className="svg"
          shapeRendering="optimizeSpeed"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
          viewBox={`${-padding} ${-padding} ${2 * padding + hex.width * (hex.perRegionAxis + 0.5)} ${2 * padding + hex.height * (hex.perRegionAxis * 3 / 4 + 1 / 4)}`}
        >
          <Terrain terrainList={terrainList} regionCoordinates={coordinates} />

          <Locations
            locations={locations}
            locationList={locationList}
            regionCoordinates={coordinates}
            targetLocation={this.targetLocation}
          />
        </svg>

        <RegionUI
          targetLocation={targetLocation ? locations[targetLocation] : null}
        />
      </div>
    );
  }
}
