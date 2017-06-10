import React from "react";
import firebase from "firebase";
import reactMixin from "react-mixin";
import reactFire from "reactfire";

import World from "../components/World.js";

export default class PlayerProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { player: null };
  }

  componentDidMount() {
    const { uid } = { ...this.props };
    if (uid) {
      this.bindFirebase(uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { uid } = { ...this.props };
    if (nextProps.uid !== uid) {
      if (this.firebaseRefs.player) {
        this.unbind("player");
      }
      if (nextProps.uid) {
        this.bindFirebase(nextProps.uid);
      }
    }
  }

  bindFirebase = uid => {
    this.bindAsObject(
      firebase.database().ref(`players/${uid}`),
      "player",
      function(error) {
        console.log("Player subscription cancelled:");
        console.log(error);
        this.setState({ player: null });
      }.bind(this)
    );
  };

  render() {
    const { player } = { ...this.state };
    const { uid } = { ...this.props };

    return player === null ? null : <World player={player} uid={uid} />;
  }
}

reactMixin(PlayerProvider.prototype, reactFire);
