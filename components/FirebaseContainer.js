import React, { Component } from "react";

import Tile from "../components/Tile.js";

export default class FirebaseContainer extends Component {
  render() {
    const { style, index } = { ...this.props };

    return (
      <div className="firebaseContainer" style={style}>
        <Tile index={index} />
      </div>
    );
  }
}
