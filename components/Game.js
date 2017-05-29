import React, { Component } from "react";

import World from "../components/World.js";
import Hero from "../components/Hero.js";
import Layer from "../components/Layer.js";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

// const sortTiles = (a, b) => {
//   if (a.y < b.y) return -1;
//   if (a.y > b.y) return 1;
//   return 0;
// };

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerPosition: [50000, 50000],
      visionRange: 8,
      renderRange: 5,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(state => {
        return {
          ...state,
          playerPosition: [
            state.playerPosition[0] + Math.floor(Math.random() * 3 - 1),
            state.playerPosition[1] + Math.floor(Math.random() * 3 - 1),
          ],
        };
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { playerPosition, visionRange, renderRange } = { ...this.state };

    const playerPixelCoordinates = hex.pixelCoordinates(playerPosition);

    return (
      <div id="game">
        <style jsx global>{`
          html {
            font-size: 133%; /* Fallback: used if browser doesn't support calc() */
            font-size: calc(1em + 0.5vw + 0.5vh + 0.25vmin);
            background-color: ${styles.map};
            color: white;
          }

          body {
            line-height: 1rem;
            font-size: 0.8rem; /* = line-height of 1.25 */
          }

          #game {
            height: 300vh;
          }

          #viewport {
            position: fixed;
            left: 0; top: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
          }
        `}</style>

        <div id="viewport">
          <World
            tiles={hex.hexesWithin(playerPosition, renderRange)}
            playerPosition={playerPosition}
            playerPixelCoordinates={playerPixelCoordinates}
            visionRange={visionRange}
          />
        </div>
      </div>
    );
  }
}
