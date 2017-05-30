import React from "react";

import Location from "../components/Location";

export default class Locations extends React.Component {
  render() {
    const { locationList, locations, regionCoordinates } = { ...this.props };

    if (!locationList || locationList.length === 0) {
      return null;
    }

    return (
      <g className="locations">
        {locationList.map(locationID => {
          const locationCoordinates = locationID.split(",");

          return (
            <Location
              key={locationID}
              locationID={locationID}
              x={+locationCoordinates[0]}
              y={+locationCoordinates[1]}
              regionCoordinates={regionCoordinates}
              targetLocation={this.props.targetLocation}
              {...locations[locationID]}
            />
          );
        })}
      </g>
    );
  }
}
