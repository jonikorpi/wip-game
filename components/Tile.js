import React, { Component } from "react";

import Layer from "../components/Layer.js";
import Ground from "../components/Ground.js";
import Beach from "../components/Beach.js";
import WaterLine from "../components/WaterLine.js";
import Reflection from "../components/Reflection.js";
import Water from "../components/Water.js";
import Entity from "../components/Entity.js";
import Hero from "../components/Hero.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

const createFakeHeroes = () => {
  return [...Array(Math.floor(Math.random() * 10)).keys()].map(hero => {
    return Math.random() / 2;
  });
};

export default class Tile extends Component {
  constructor(props) {
    super(props);

    const { x, y, visible } = { ...props };
    const tileID = `${x},${y}`;
    const pixelCoordinates = hex.pixelCoordinates([x, y]);

    const originalSeed = Math.abs((x || 123) * (y || 456) / (x || 123));
    const tileType = tileTypes.getRandomTile(x * y);
    const entityType = maths.random(1, x * y) > 0.95 && "mountain";
    const heroes = !entityType && tileType.walkable && createFakeHeroes();

    this.state = {
      id: tileID,
      x: x,
      y: y,
      left: pixelCoordinates[0],
      top: -pixelCoordinates[1],
      originalSeed: originalSeed,
      tileType: tileType,
      entityType: entityType,
      heroes: heroes,
      visible: visible,
    };
  }

  // componentDidMount() {
  //   if (this.state.heroes) {
  //     this.timer = setInterval(() => {
  //       this.setState(state => {
  //         return {
  //           ...state,
  //           heroes: createFakeHeroes(),
  //         };
  //       });
  //     }, Math.floor(2000 + maths.random(6000, this.state.seed)));
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  handleMouseEnter = () => {
    this.props.targetTile(this.state);
  };

  handleMouseLeave = () => {
    this.props.targetTile(null);
  };

  render() {
    const {
      x,
      y,
      left,
      top,
      originalSeed,
      tileType,
      entityType,
      heroes,
      visible,
    } = {
      ...this.state,
    };

    let seed = originalSeed;
    // const zIndex = y + 2147483646 / 2;

    const points = hex.baseHexCoordinates.map(point => {
      return [
        point[0] +
          maths.random(hex.randomRange, seed++) *
            (point[0] < hex.width / 2 ? -1 : 1),
        point[1] +
          maths.random(hex.randomRange, seed++) *
            (point[1] < hex.height / 2 ? -0.5 : 0.5),
      ];
    });

    return (
      <div
        className="tile"
        style={{
          left: (left - hex.width / 2) * hex.renderingSize + hex.unit,
          top: (top - hex.height / 2) * hex.renderingSize + hex.unit,
          opacity: visible ? 1 : 0.5,
        }}
      >
        <style jsx global>{`
          .tile {
            position: absolute;
            height: ${hex.height * hex.renderingSize + hex.unit};
            width: ${hex.width * hex.renderingSize + hex.unit};
            /*outline: 1px solid;*/
          }

          .tileTarget {
            pointer-events: all;
            cursor: pointer;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            opacity: 0;
          }

          .tileTarget:hover {
            opacity: 1;
          }

          .entity-hero {
            transition: transform 2s ease-in-out;
          }
        `}</style>

        {/*{visible &&
          <Layer
            <Water  seed={seed++} points={points} />
          </Layer>}*/}

        {tileType.walkable &&
          <Layer style={{ zIndex: 2 }} className="reflection">
            <Reflection seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={{ zIndex: 3 }} className="waterLine">
            <WaterLine seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={{ zIndex: 4 }} className="beach">
            <Beach seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={{ zIndex: 5 }} className="ground">
            <Ground seed={seed++} points={points} />
          </Layer>}

        {entityType &&
          <Layer style={{ zIndex: 6 }} className="entity">
            <Entity type={entityType} x={0} y={0} seed={seed++} />
          </Layer>}

        {heroes &&
          heroes.length > 0 &&
          <Layer style={{ zIndex: 6 }} className="heroes">
            {heroes.map((hero, index) => (
              <Hero
                key={index}
                x={hex.width * (maths.random(0.5, hero) + 0.25)}
                y={hex.height * (maths.random(0.5, hero + 1) + 0.25)}
                //{...hero}
              />
            ))}
          </Layer>}

        <Layer style={{ zIndex: 7 }} className="tileTargets">
          <polygon
            stroke={styles.white}
            fill="none"
            points={hex.baseHexCoordinates}
            className="tileTarget"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
        </Layer>
      </div>
    );
  }
}
