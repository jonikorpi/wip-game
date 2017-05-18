import React, { Component } from "react";

import Tile from "../components/Tile.js";
import Hero from "../components/Hero.js";
import TileUI from "../components/TileUI.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

const maxScale = 1;
const minScale = maxScale / 100;
const html = typeof document !== "undefined" && document.documentElement;
const body = document.body;

const updateScale = () => {
  if (html) {
    const scrolled =
      1 - window.pageYOffset / (body.clientHeight - window.innerHeight);
    const scale = scrolled * (maxScale - minScale) + minScale;
    html.style.setProperty("--zoom", scale);
  }
};

const handleScroll = () => {
  requestAnimationFrame(updateScale);
};

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

        const hero = heroID && {
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
          entity: entityType,
          heroes: hero ? [hero] : [],
          ...tileType,
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
      heroes: {},
    };
  }

  componentWillMount() {
    this.setState(buildState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(buildState);
  }

  componentDidMount() {
    window.addEventListener("scroll", handleScroll);
    updateScale();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", handleScroll);
  }

  render() {
    const tiles = this.state.tiles;
    const tileList = Object.keys(tiles);
    const heroes = this.state.heroes;
    const heroList = Object.keys(heroes);

    return (
      <div id="world">
        <style jsx global>{`
          html {
            --playerX: 0;
            --playerY: 0;
            --zoom: ${maxScale};
          }

          #world {
            perspective: 1000px;
            transform: translateZ(0);
          }
        `}</style>

        {tileList.map(tile => {
          return <Tile {...tiles[tile]} heroes={undefined} />;
        })}

        {heroList.map(hero => {
          return <Hero {...heroes[hero]} />;
        })}

        {tileList.map(tile => {
          return <TileUI {...tiles[tile]} />;
        })}
      </div>
    );
  }
}