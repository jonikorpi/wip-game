import React, { PureComponent } from "react";

import Tile from "../components/Tile.js";

export default class Location extends PureComponent {
  render() {
    return <Tile {...this.props} />;
  }
}
