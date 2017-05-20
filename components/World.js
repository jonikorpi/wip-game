import React, { Component } from "react";

import Location from "../components/Location.js";

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

export default class World extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
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
    const { playerPixelCoordinates, playerPosition, tiles, visionRange } = {
      ...this.props,
    };

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
            will-change: --zoom, --playerX, --playerY;
            /*perspective: 1000px;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;*/
          }
        `}</style>

        {tiles.map(tile => {
          return (
            <Location
              key={`${tile[0]},${tile[1]}`}
              x={tile[0]}
              y={tile[1]}
              //visible={hex.distanceBetween(playerPosition, tile) <= visionRange}
            />
          );
        })}
      </div>
    );
  }
}
