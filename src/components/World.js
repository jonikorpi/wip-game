import React from "react";
// import "aframe";
// import { Scene } from "aframe-react";
import firebase from "firebase";
import Measure from "react-measure";

import hex from "../helpers/hex";

import RegionProvider from "../components/RegionProvider.js";

const setPlayerLocation = props => {
  const { player, uid } = { ...props };

  if (!player.location) {
    console.log("Player has no location. Setting it!");

    firebase.database().ref(`players/${uid}`).update({
      location: `${Math.floor(Math.random() * 900000)},${Math.floor(
        Math.random() * 900000
      )}`,
      action: {},
    });
  }
};

export default class World extends React.Component {
  componentWillMount() {
    setPlayerLocation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    setPlayerLocation(nextProps);
  }

  render() {
    const { player } = { ...this.props };

    return (
      <Measure bounds>
        {({ measureRef, contentRect }) => {
          const heightRatio =
            contentRect.bounds.height / contentRect.bounds.width || 1;
          const landscape = heightRatio < hex.perRegionY / hex.perRegionX;
          const angle = landscape
            ? hex.perRegionY / hex.perRegionX / heightRatio
            : hex.perRegionX / hex.perRegionY / heightRatio;

          return (
            <div id="world" ref={measureRef}>
              {/* <Scene stats embedded> */}
              {player &&
                player.location &&
                <RegionProvider
                  coordinates={player.location.split(",")}
                  regionID={player.location}
                  angle={angle}
                  landscape={landscape}
                />}
              {/* </Scene> */}
            </div>
          );
        }}
      </Measure>
    );
  }
}
