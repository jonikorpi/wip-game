import React from "react";

import Location from "../components/Location";

export default class Locations extends React.Component {
  render() {
    const { locations, heightRatio } = {
      ...this.props,
    };

    const locationList = locations && Object.keys(locations);

    if (!locationList || locationList.length === 0) {
      return null;
    }

    return (
      <div className="locations">
        {locationList.map(locationID => {
          const locationCoordinates = locationID.split(",");

          return (
            <Location
              key={locationID}
              locationID={locationID}
              x={+locationCoordinates[0]}
              y={+locationCoordinates[1]}
              heightRatio={heightRatio}
              tile={locations[locationID].tile}
              entity={locations[locationID].entity}
            />
          );
        })}
      </div>
    );
  }
}
