import React from "react";
import rebase from "../helpers/rebase.js";

import World from "../components/World.js";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = { player: null };
  }

  componentWillMount() {
    const { uid } = { ...this.props };

    rebase.bindToState(`players/${uid}`, {
      context: this,
      state: "player",
    });
  }

  render() {
    const { player } = { ...this.state };
    const { uid } = { ...this.props };

    return player === null ? null : <World player={player} uid={uid} />;
  }
}
