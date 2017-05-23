import React, { PureComponent } from "react";
import { Motion, spring } from "react-motion";

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
      <Motion
        defaultStyle={{ left: left, top: top, scale: scale }}
        style={{
          left: spring(left),
          top: spring(top),
          scale: spring(scale),
        }}
      >
        {({ left, top, scale }) => (
          <div
            id="camera"
            style={{
              transform: `translate3d(${-left * hex.renderingSize * scale + hex.unit}, ${top * hex.renderingSize * scale + hex.unit}, 0) scale3d(${scale}, ${scale}, ${scale})`,
            }}
          >
            {this.props.children}
          </div>
        )}
      </Motion>
    );
  }
}
