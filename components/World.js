import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import firebase from "firebase";

import RegionProvider from "../components/RegionProvider.js";

const setPlayerLocation = props => {
  const { player, uid } = { ...props };

  if (!player.location) {
    console.log("Player has no location. Setting it!");

    firebase.database().ref(`players/${uid}`).update({
      location: `${Math.floor(Math.random() * 900000)},${Math.floor(Math.random() * 900000)}`,
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
      <div id="world">
        <style jsx global>{`
          #world {

          }
        `}</style>

        <CSSTransitionGroup
          transitionName="region"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {player &&
            player.location &&
            <RegionProvider
              coordinates={player.location.split(",")}
              regionID={player.location}
            />}
        </CSSTransitionGroup>
      </div>
    );
  }
}
