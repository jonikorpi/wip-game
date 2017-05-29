import React from "react";

import RegionUI from "../components/RegionUI.js";
import Location from "../components/Location.js";
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

  targetLocation = tile => {
    this.setState({ targetLocation: tile });
  };

  render() {
    const { coordinates } = { ...this.props };
    const { targetLocation, locations } = { ...this.state };

    const locationList = locations && Object.keys(locations);
    const terrainList =
      locationList &&
      locationList.filter(locationID => locations[locationID].tile.walkable);

    return (
      <div className="region">
        <style jsx global>{`

        `}</style>

        {terrainList &&
          <Terrain locations={terrainList} regionCoordinates={coordinates} />}

        {/* {locationList.length > 0 &&
          locationList.map(locationID => {
            const locationCoordinates = locationID.split(",");

            return (
              <Location
                key={locationID}
                locationID={locationID}
                x={locationCoordinates[0]}
                y={locationCoordinates[1]}
                regionCoordinates={coordinates}
                targetLocation={this.targetLocation}
                {...locations[locationID]}
              />
            );
          })} */}

        <RegionUI
          targetLocation={targetLocation ? locations(targetLocation) : null}
        />
      </div>
    );
  }
}
