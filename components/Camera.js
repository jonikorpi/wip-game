import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";

const maxScale = 1;
const minScale = maxScale / 100;
const body = typeof document !== "undefined" && document.body;

const setScale = state => {
  const scale = body
    ? Math.max(
        (1 - window.pageYOffset / (body.clientHeight - window.innerHeight)) *
          (maxScale - minScale) +
          minScale,
        0
      )
    : maxScale;

  return { ...state, scale: scale };
};

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scale: maxScale,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    // this.updateScale();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.frame = this.frame || requestAnimationFrame(this.updateScale);
  };

  updateScale = () => {
    this.frame = null;
    this.setState(setScale);
  };

  render() {
    const { playerPixelCoordinates } = {
      ...this.props,
    };
    const { scale } = { ...this.state };
    const [left, top] = [...playerPixelCoordinates];

    return (
      <div
        id="camera"
        style={{
          transform: `scale3d(${scale}, ${scale}, ${scale})`,
        }}
      >
        <style jsx global>{`
          #camera {
            position: absolute;
            left: 50%; top: 50%;
            width: 0;
            height: 0;
            will-change: transform;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            perspective: 1000px;
          }
        `}</style>

        {this.props.children}
      </div>
    );
  }
}
