import React from "react";
import Measure from "react-measure";

import Locations from "../components/Locations.js";
import Heroes from "../components/Heroes.js";
import Terrain from "../components/Terrain.js";
import SVG from "../components/SVG.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

const locationList = hex.rectangleOfHexes(hex.perRegionAxis, hex.perRegionAxis);

const randomizeState = oldState => {
  let state = { ...oldState };

  Object.keys(state.heroes).forEach(heroID => {
    const hero = state.heroes[heroID];
    const [x, y] = hero.location.split(",");
    const [newX, newY] = locationList[
      Math.floor(Math.random() * locationList.length)
    ];
    hero.location = `${newX},${newY}`;
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

  render() {
    const { coordinates } = { ...this.props };
    const { tiles, entities, heroes } = { ...this.state };

    // Bundle tiles into locations
    let locations = locationList.reduce((locations, location) => {
      const [x, y] = location;
      const locationID = `${x},${y}`;
      const tile = tiles[locationID] || {};

      locations[locationID] = {
        tile: {
          ...tileTypes.tiles["water"],
          ...tile,
        },
        entity: null,
        heroes: {},
      };

      return locations;
    }, {});

    // Add entities
    const entityList = entities && Object.keys(entities);
    if (entityList.length > 0) {
      entityList.forEach(entityID => {
        const locationID = entities[entityID].location;
        locations[locationID].entity = {
          key: entityID,
          ...entities[entityID],
        };
      });
    }

    // Add heroes
    const heroList = heroes && Object.keys(heroes);
    if (heroList.length > 0) {
      heroList.forEach(heroID => {
        const locationID = heroes[heroID].location;
        locations[locationID].heroes[heroID] = heroes[heroID];
      });
    }

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

                <Locations locations={locations} heightRatio={heightRatio} />
                <Heroes heroes={heroes} heightRatio={heightRatio} />
              </div>
            );
          }}
        </Measure>
      </div>
    );
  }
}
