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
const body = typeof document !== "undefined" && document.body;

const getScale = () => {
  return body
    ? Math.max(
        (1 - window.pageYOffset / (body.clientHeight - window.innerHeight)) *
          (maxScale - minScale) +
          minScale,
        0
      )
    : maxScale;
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
          top: -pixelCoordinates[1],
          zIndex: y + 2147483646 / 2,
        };

        const heroID =
          visible &&
          !entityType &&
          tileType.walkable &&
          "hero-" + maths.random(1000, x + y);

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
          playerIsHere: playerPosition[0] === x && playerPosition[1] === y,
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

const sortTiles = (a, b) => {
  if (a.y < b.y) return -1;
  if (a.y > b.y) return 1;
  return 0;
};

export default class World extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: {},
      heroes: {},
      scale: 1,
    };
  }

  componentWillMount() {
    this.setState(buildState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(buildState);
    this.updateCamera(nextProps.playerPixelCoordinates);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.updateScale();
    this.updateCamera(this.props.playerPixelCoordinates);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.frame = this.frame || requestAnimationFrame(this.updateScale);
  };

  updateScale = () => {
    this.frame = null;
    this.world.style.setProperty("--zoom", getScale());
  };

  updateCamera = (
    timestamp,
    playerPixelCoordinates = this.props.playerPixelCoordinates
  ) => {
    this.world.style.setProperty("--playerX", playerPixelCoordinates[0]);
    this.world.style.setProperty("--playerY", -playerPixelCoordinates[1]);
  };

  render() {
    const { playerPixelCoordinates, playerPosition } = { ...this.props };
    const { tiles, heroes } = { ...this.state };

    const tileList = Object.keys(tiles).sort(sortTiles);
    const heroList = Object.keys(heroes).sort(sortTiles);

    return (
      <div
        id="world"
        ref={ref => {
          this.world = ref;
        }}
      >
        <style jsx global>{`
          #world {
            --playerX: 0;
            --playerY: 0;
            --zoom: ${maxScale};
            {/*perspective: 1000px;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;*/}
            will-change: --zoom, --playerX, --playerY;
          }
        `}</style>

        {tileList.map(tile => {
          return tile === "water"
            ? null
            : <Tile {...tiles[tile]} heroes={undefined} />;
        })}

        {heroList.map(hero => {
          return <Hero {...heroes[hero]} />;
        })}

        {/*
          {tileList.map(tile => {
            return <TileUI {...tiles[tile]} />;
          })}
        */}
      </div>
    );
  }
}
