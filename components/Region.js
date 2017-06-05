import React from "react";
import Measure from "react-measure";

import Location from "../components/Location.js";
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
    const { tiles, entities, heroes, regionSeed } = { ...this.props };
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
          result[locationID] = result[locationID] && result[locationID].isArray
            ? result[locationID].push(heroes[heroID])
            : [heroes[heroID]];
          return result;
        }, {})
      : {};

    return (
      <div className="region">
        <style jsx global>{`
          .region {
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
          }

          .centerer {
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            max-height: ${hex.perRegionY / hex.perRegionX * 100}vw;
            margin: auto;
            overflow: hidden;
          }
        `}</style>

        <Measure bounds>
          {({ measureRef, contentRect }) => {
            const heightRatio =
              contentRect.bounds.height / contentRect.bounds.width || 1;

            return (
              <div className="centerer" ref={measureRef}>
                {locationList.map(location => {
                  const locationID = `${location[0]},${location[1]}`;
                  return (
                    <Location
                      key={locationID}
                      locationID={locationID}
                      x={+location[0]}
                      y={+location[1]}
                      tile={
                        tiles && tiles[locationID]
                          ? tiles[locationID]
                          : tileTypes.tiles["water"]
                      }
                      entity={entityIndex[locationID]}
                      setTargetedLocation={this.setTargetedLocation}
                      heightRatio={heightRatio}
                      regionSeed={regionSeed}
                    />
                  );
                })}

                {heroList &&
                  heroList.length > 0 &&
                  heroList.map(heroID => {
                    return (
                      <Hero
                        key={heroID}
                        {...heroes[heroID]}
                        heightRatio={heightRatio}
                      />
                    );
                  })}
              </div>
            );
          }}
        </Measure>

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
