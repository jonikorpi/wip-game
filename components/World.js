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
    this.updateCamera(nextProps.playerPosition);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.updateScale();
    this.updateCamera(this.props.playerPosition);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    requestAnimationFrame(this.updateScale);
  };

  updateScale = () => {
    if (body) {
      const scrolled =
        1 - window.pageYOffset / (body.clientHeight - window.innerHeight);
      const scale = scrolled * (maxScale - minScale) + minScale;
      this.world.style.setProperty("--zoom", scale);
    }
  };

  updateCamera = playerPosition => {
    const pixelCoordinates = hex.pixelCoordinates(playerPosition);
    this.world.style.setProperty("--playerX", pixelCoordinates[0]);
    this.world.style.setProperty("--playerY", pixelCoordinates[1]);
  };

  render() {
    const tiles = this.state.tiles;
    const tileList = Object.keys(tiles);
    const heroes = this.state.heroes;
    const heroList = Object.keys(heroes);

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
            perspective: 1000px;
            transform: translateZ(0);
          }
        `}</style>

        <div>
          {tileList.map(tile => {
            return <Tile {...tiles[tile]} heroes={undefined} />;
          })}
        </div>

        <div>
          {heroList.map(hero => {
            return <Hero {...heroes[hero]} />;
          })}
        </div>

        <div>
          {tileList.map(tile => {
            return <TileUI {...tiles[tile]} />;
          })}
        </div>
      </div>
    );
  }
}
