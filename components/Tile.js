import React from "react";

import Entity from "../components/Entity.js";
import Hero from "../components/Hero.js";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";
import entities from "../helpers/entities.js";
import maths from "../helpers/maths.js";

export default class Tile extends React.PureComponent {
  handleMouseEnter = () => {
    this.props.targetTile(this.props.locationID);
  };

  handleMouseLeave = () => {
    this.props.targetTile(null);
  };

  render() {
    return null;
    const { left, top, originalSeed, tileType, entityType, heroes, visible } = {
      ...this.props,
    };

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
      <div className="tile">
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

        <Layer style={{ ...transform, zIndex: 1 }} className="water">
          <Water seed={seed++} points={points} />
        </Layer>

        {tileType.walkable &&
          <Layer style={{ ...transform, zIndex: 2 }} className="reflection">
            <Reflection seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={{ ...transform, zIndex: 3 }} className="waterLine">
            <WaterLine seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={{ ...transform, zIndex: 4 }} className="beach">
            <Beach seed={seed++} points={points} />
          </Layer>}

        {tileType.walkable &&
          <Layer style={{ ...transform, zIndex: 5 }} className="ground">
            <Ground seed={seed++} points={points} />
          </Layer>}

        {entityType &&
          <Layer style={{ ...transform, zIndex: 6 }} className="entity">
            <Entity type={entityType} x={0} y={0} seed={seed++} />
          </Layer>}

        {heroes &&
          heroes.length > 0 &&
          <Layer style={{ ...transform, zIndex: 6 }} className="heroes">
            {heroes.map((hero, index) => (
              <Hero
                key={index}
                x={hex.width * (maths.random(0.5, hero) + 0.25)}
                y={hex.height * (maths.random(0.5, hero + 1) + 0.25)}
                //{...hero}
              />
            ))}
          </Layer>}

        <Layer style={{ ...transform, zIndex: 7 }} className="tileTargets">
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
