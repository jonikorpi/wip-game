import React, { Component } from "react";
// import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import firebase from "firebase";
import initializeFirebase from "../helpers/initializeFirebase";

import PlayerProvider from "../components/PlayerProvider.js";

import styles from "../helpers/styles.js";

initializeFirebase();
// const env = (process && process.env && process.env.NODE_ENV) || "development";
// const dev = env === "development";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymously();

    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user && {
          uid: user.uid,
          anonymous: user.isAnonymous,
        },
      });
    });
  }

  render() {
    const { user } = { ...this.state };

    return (
      <div id="game">
        {/* <GameUI/> */}

        {/* <CSSTransitionGroup
          transitionName="map"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          <Map playerPosition={playerPosition} />
        </CSSTransitionGroup> */}

        {user && user.uid && <PlayerProvider uid={user.uid} />}
      </div>
    );
  }
}
