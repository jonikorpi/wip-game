import React from "react";

import Tile from "../components/Tile.js";
import Entity from "../components/Entity.js";
import Hero from "../components/Hero.js";
import LocationUI from "../components/LocationUI.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";

const locationList = hex.rectangleOfHexes(hex.perRegionX, hex.perRegionY);

export default class Region extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      targetedLocationID: null,
    };
  }

  setTargetedLocation = locationID => {
    this.setState({ targetedLocationID: locationID });
  };

  render() {
    const { tiles, entities, heroes, regionSeed, landscape, angle } = {
      ...this.props,
    };
    const { targetedLocationID } = { ...this.state };

    // Index entities by location
    const entityList = entities && Object.keys(entities);
    const entityIndex = entityList
      ? entityList.reduce((result, entityID) => {
          const locationID = entities[entityID].location;
          result[locationID] = entities[entityID];
          return result;
        }, {})
      : {};

    // Index heroes by location
    const heroList = heroes && Object.keys(heroes);
    const heroIndex = heroList
      ? heroList.reduce((result, heroID) => {
          const locationID = heroes[heroID].location;

          if (typeof result[locationID] === "undefined") {
            result[locationID] = [];
          }

          result[locationID].push(heroes[heroID]);
          return result;
        }, {})
      : {};

    return (
      <div className="region">
        <div className="locations">
          {locationList.map(location => {
            const locationID = `${location[0]},${location[1]}`;
            const tileProps = tiles && tiles[locationID]
              ? tiles[locationID]
              : tileTypes.tiles["water"];
            return (
              <Tile
                key={locationID}
                locationID={locationID}
                regionSeed={regionSeed}
                x={+location[0]}
                y={+location[1]}
                setTargetedLocation={this.setTargetedLocation}
                angle={angle}
                landscape={landscape}
                {...tileProps}
              />
            );
          })}
        </div>

        <div className="entities">
          {entityList.map(entityID => {
            const entity = entities[entityID];
            const [x, y] = entity.location.split(",");

            return (
              <Entity
                key={entityID}
                regionSeed={regionSeed}
                x={+x}
                y={+y}
                angle={angle}
                landscape={landscape}
                {...entity}
              />
            );
          })}
        </div>

        <div className="heroes">
          {heroList &&
            heroList.length > 0 &&
            heroList.map(heroID => {
              return (
                <Hero
                  key={heroID}
                  angle={angle}
                  landscape={landscape}
                  {...heroes[heroID]}
                />
              );
            })}
        </div>

        <LocationUI
          target={
            targetedLocationID
              ? {
                  locationID: targetedLocationID,
                  tile: tiles[targetedLocationID]
                    ? tiles[targetedLocationID]
                    : tileTypes.tiles["water"],
                  entity: entityIndex[targetedLocationID],
                  heroes: heroIndex[targetedLocationID],
                }
              : null
          }
        />
      </div>
    );
  }
}
