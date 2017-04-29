import React, { PureComponent } from "react";

import Container from "../components/Container.js";

export default class Cell extends PureComponent {
  render() {
    const { cellX, cellY, style } = { ...this.props };

    return (
      <div
        className="cell"
        style={{
          color: `hsl(${cellX * cellY % 360}, 50%, 50%)`,
          ...style,
        }}
      >
        <Container cellX={cellX} cellY={cellY} />
      </div>
    );
  }
}
