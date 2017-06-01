import React from "react";
import Measure from "react-measure";

import Location from "../components/Location.js";
import Hero from "../components/Hero.js";
import Terrain from "../components/Terrain.js";
import SVG from "../components/SVG.js";
import LocationUI from "../components/LocationUI.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

const locationList = hex.rectangleOfHexes(hex.perRegionAxis, hex.perRegionAxis);

const randomizeState = oldState => {
  let state = { ...oldState };

  // Randomize some tiles
  Object.keys(state.tiles).forEach(locationID => {
    if (Math.random() > 0.75) {
      const tile = tileTypes.getRandomTile(Math.random());
      const [x, y] = locationID.split(",");

      state.tiles[`${x},${y}`] = {
        ...tile,
      };
    }
  });

  // Randomize some entities
  Object.keys(state.entities).forEach(entityID => {
    if (Math.random() > 0.75) {
      const entity = state.entities[entityID];
      const [newX, newY] = locationList[
        Math.floor(Math.random() * locationList.length)
      ];
      entity.location = `${newX},${newY}`;
    }
  });

  // Randomize some heroes
  Object.keys(state.heroes).forEach(heroID => {
    if (Math.random() > 0.75) {
      const hero = state.heroes[heroID];
      const [newX, newY] = locationList[
        Math.floor(Math.random() * locationList.length)
      ];
      hero.location = `${newX},${newY}`;
    }
  });

  return state;
};

export default class Region extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: {},
      entities: {},
      heroes: {},
      targetedLocationID: null,
    };
  }

  componentDidMount() {
    const { coordinates } = { ...this.props };
    let seed = maths.getSeed(coordinates);

    this.setState({
      tiles: locationList.reduce((locations, location) => {
        const tile = tileTypes.getRandomTile(seed++);

        if (tile.type !== "water") {
          locations[`${location[0]},${location[1]}`] = {
            ...tile,
          };
        }
        return locations;
      }, {}),

      entities: locationList.reduce((entities, location) => {
        if (maths.random(1, seed++) > 0.8) {
          entities["entity-" + maths.random(seed++)] = {
            ...entities["mountain"],
            location: `${location[0]},${location[1]}`,
          };
        }
        return entities;
      }, {}),

      heroes: locationList.reduce((heroes, location) => {
        if (maths.random(1, seed++) > 0.75) {
          heroes["hero-" + maths.random(seed++)] = {
            location: `${location[0]},${location[1]}`,
          };
        }
        return heroes;
      }, {}),
    });

    this.timer = setInterval(() => {
      this.setState(randomizeState);
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTargetedLocation = locationID => {
    this.setState({ targetedLocationID: locationID });
  };

  render() {
    const { coordinates } = { ...this.props };
    const { tiles, entities, heroes, targetedLocationID } = { ...this.state };

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
          result[locationID] = result[locationID]
            ? result[locationID].push(heroes[heroID])
            : [heroes[heroID]];
          return result;
        }, {})
      : {};

    // List terrain tiles
    const tileList = tiles && Object.keys(tiles);
    const terrainList =
      tileList && tileList.filter(locationID => tiles[locationID].walkable);

    return (
      <div className="region">
        <style jsx global>{`
          .region {
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            min-height: ${styles.minHeight * 100}vw;
          }

          .centerer {
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            max-height: ${styles.maxHeight * 100}vw;
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
                <SVG
                  viewBox={`${-styles.padding} ${-styles.padding} ${styles.width} ${styles.height}`}
                >
                  <Terrain
                    terrainList={terrainList}
                    regionCoordinates={coordinates}
                    heightRatio={heightRatio}
                  />
                </SVG>

                {locationList.map(location => {
                  const locationID = `${location[0]},${location[1]}`;
                  return (
                    <Location
                      key={locationID}
                      locationID={locationID}
                      x={location[0]}
                      y={location[1]}
                      heightRatio={heightRatio}
                      tile={
                        tiles[locationID]
                          ? tiles[locationID]
                          : tileTypes.tiles["water"]
                      }
                      entity={entityIndex[locationID]}
                      setTargetedLocation={this.setTargetedLocation}
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
