import React from "react";

import Tile from "../components/Tile.js";

export default class Location extends React.PureComponent {
  render() {
    return <Tile {...this.props} />;
  }
}
