import React, { Component } from "react";

import Tile from "../components/Tile.js";
import Hero from "../components/Hero.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

const buildState = (state, { tiles, visionRange, playerPosition }) => {
  return {
    ...state,
    ...tiles.reduce(
      (lists, tile) => {
        const x = tile[0];
        const y = tile[1];
        const tileID = `${x},${y}`;
        const pixelCoordinates = hex.pixelCoordinates([x, y]);
        const visible =
          hex.distanceBetween(playerPosition, tile) <= visionRange;
        const tileType = tileTypes.getRandomTile(x * y);
        const entityType = maths.random(1, x * y) > 0.95 && "mountain";

        const commonProps = {
          x: x,
          y: y,
          left: pixelCoordinates[0],
          top: pixelCoordinates[1],
          zIndex: y + 100000,
        };

        const heroID =
          visible &&
          !entityType &&
          tileType.walkable &&
          "hero-" + x + y + x * y * x * Math.random();

        const hero = visible && {
          key: heroID,
          ...commonProps,
        };

        if (hero) {
          lists.heroes[heroID] = hero;
        }

        lists.tiles[tileID] = {
          key: tileID,
          ...commonProps,
          visible: visible,
          tile: tileType,
          entity: entityType,
          heroes: hero ? [hero] : [],
        };

        return lists;
      },
      { tiles: {}, heroes: {} }
    ),
  };
};

export default class World extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: {},
      heroGroups: {},
    };
  }

  componentWillMount() {
    this.setState(buildState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(buildState);
  }

  render() {
    const tiles = this.state.tiles;
    const tileList = Object.keys(tiles);
    const heroes = this.state.heroes;
    const heroList = Object.keys(heroes);

    return (
      <div id="game">
        <style jsx>{`
          #game {
            height: 200vh;
          }

          #viewport {
            position: fixed;
            left: 0; top: 0;
            width: 100vw;
            height: 100vh;
          }

          #origo {
            position: absolute;
            left: 50%; top: 50%;
            width: 0;
            height: 0;
          }
        `}</style>

        <div id="viewport">
          <div id="origo">
            {tileList.map(tile => {
              return <Tile {...tiles[tile]} />;
            })}

            {heroList.map(hero => {
              return <Hero {...heroes[hero]} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
