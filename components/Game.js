import React, { Component } from "react";

import World from "../components/World.js";

import hex from "../helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const playerPosition = [0, 0];
    const visionRange = 3;
    const renderRange = 5;

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
            <World
              tiles={hex.hexesWithin(playerPosition, renderRange)}
              visionRange={visionRange}
              playerPosition={playerPosition}
            />
          </div>
        </div>
      </div>
    );
  }
}
