import React, { Component } from "react";

import World from "../components/World.js";
import Hero from "../components/Hero.js";
import Layer from "../components/Layer.js";

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
      playerPosition: [9000000, -9000000],
      visionRange: 5,
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

    return (
      <div id="game">
        <style jsx global>{`
          #game {
            height: 300vh;
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
            margin-left: ${-hex.width / 2 * hex.renderingSize + hex.unit};
            margin-top: ${-hex.height / 2 * hex.renderingSize + hex.unit};
          }

          .player {
            position: absolute;
            height: ${hex.height * hex.renderingSize + hex.unit};
            width: ${hex.width * hex.renderingSize + hex.unit};
            z-index: 100;
          }
        `}</style>

        <div id="viewport">
          <div id="origo">
            <div className="player">
              <Layer className="playerLayer">
                <Hero x={hex.width / 2} y={hex.height / 2} />
              </Layer>
            </div>

            <World
              tiles={hex.hexesWithin(playerPosition, renderRange)}
              visionRange={visionRange}
              playerPosition={playerPosition}
              playerPixelCoordinates={hex.pixelCoordinates(playerPosition)}
            />
          </div>
        </div>
      </div>
    );
  }
}
