import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import Region from "../components/Region.js";

export default class World extends React.PureComponent {
  render() {
    const { playerPosition } = { ...this.props };

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
          <Region
            coordinates={playerPosition}
            regionID={`${playerPosition[0]},${playerPosition[1]}`}
          />
        </CSSTransitionGroup>
      </div>
    );
  }
}
