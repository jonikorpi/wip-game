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
        <style jsx global>{`
          html {
            font-size: 133%; /* Fallback: used if browser doesn't support calc() */
            font-size: calc(1em + 0.5vw + 0.5vh + 0.25vmin);
            background-color: ${styles.water};
            color: white;
          }

          body {
            line-height: 1rem;
            font-size: 0.8rem; /* = line-height of 1.25 */
          }

          #game {
            pointer-events: none;
            user-select: none;
          }
        `}</style>

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
