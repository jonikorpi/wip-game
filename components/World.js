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

const getTransform = (playerPixelCoordinates, ignoreScale) => {
  return `
    scale(${ignoreScale ? maxScale : getScale()})
    translate(
      ${(-playerPixelCoordinates[0] - hex.width / 2) * hex.renderingSize + hex.unit},
      ${(-playerPixelCoordinates[1] - hex.height / 2) * hex.renderingSize + hex.unit}
    )
  `;
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

const sortByKey = (a, b) => {
  if (a.key < b.key) return -1;
  if (a.key > b.key) return 1;
  return 0;
};

export default class World extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: {},
      heroes: {},
      scale: 1,
      clientSide: false,
    };
  }

  componentWillMount() {
    this.setState(buildState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(buildState);
    this.updateCamera(null, nextProps.playerPixelCoordinates);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.updateCamera();
    this.setState({ clientSide: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    requestAnimationFrame(this.updateCamera);
  };

  updateCamera = (
    timestamp,
    playerPixelCoordinates = this.props.playerPixelCoordinates
  ) => {
    const transform = getTransform(playerPixelCoordinates);
    this.world.style.setProperty("WebkitTransform", transform);
    this.world.style.setProperty("transform", transform);
  };

  render() {
    const { playerPixelCoordinates } = { ...this.props };
    const { tiles, heroes, clientSide } = { ...this.state };

    const tileList = Object.keys(tiles).sort(sortByKey);
    const heroList = Object.keys(heroes).sort(sortByKey);

    const transform = getTransform(playerPixelCoordinates, !clientSide);

    return (
      <div
        id="world"
        ref={ref => {
          this.world = ref;
        }}
        style={{
          WebkitTransform: transform,
          transform: transform,
        }}
      >
        <style jsx global>{`
          #world {
            will-change: transform;
            transform-origin: center center;
            transition: transform 62ms linear;
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
