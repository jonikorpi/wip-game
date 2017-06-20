import React from "react";
import firebase from "firebase";
import reactMixin from "react-mixin";
import reactFire from "reactfire";

import RegionContainer from "../components/RegionContainer.js";
import Region from "../components/Region.js";

import hex from "../helpers/hex.js";
import tileTypes from "../helpers/tileTypes.js";
import entityTypes from "../helpers/entityTypes.js";
import maths from "../helpers/maths.js";

const locationList = hex.hexesWithin([0, 0], hex.regionRadius);

const buildRegion = props => {
  const { coordinates, regionID } = { ...props };
  let seed = maths.getSeed(coordinates);

  const region = {
    tiles: locationList.reduce((locations, location) => {
      const tile = tileTypes.getRandomTile(seed++);

      if (tile.type !== "water") {
        locations[`${location[0]},${location[1]}`] = {
          ...tile,
        };
      }
      return locations;
    }, {}),

    entities: locationList.reduce((entities, location) => {
      if (maths.random(1, seed++) > 0.8) {
        entities["entity-" + Math.floor(maths.random(seed++))] = {
          ...entityTypes["default"],
          location: `${location[0]},${location[1]}`,
        };
      }
      return entities;
    }, {}),

    heroes: locationList.reduce((heroes, location) => {
      if (maths.random(1, seed++) > 0.75) {
        heroes["hero-" + Math.floor(maths.random(seed++))] = {
          location: `${location[0]},${location[1]}`,
        };
      }
      return heroes;
    }, {}),
  };

  firebase.database().ref().update({
    [`map/regions/${regionID}`]: {
      type: "default",
    },
    [`regions/${regionID}`]: region,
  });
};

const randomizeRegion = (props, region) => {
  const { coordinates, regionID } = { ...props };
  let newRegion = { ...region };
  delete newRegion[".key"];

  // // Randomize some tiles
  // Object.keys(newRegion.tiles).forEach(locationID => {
  //   if (Math.random() > 0.85) {
  //     const tile = tileTypes.getRandomTile(Math.random());
  //     const [x, y] = locationID.split(",");
  //
  //     newRegion.tiles[`${x},${y}`] = {
  //       ...tile,
  //     };
  //   }
  // });
  //
  // // Randomize some entities
  // Object.keys(newRegion.entities).forEach(entityID => {
  //   if (Math.random() > 0.85) {
  //     const entity = newRegion.entities[entityID];
  //     const [newX, newY] = locationList[
  //       Math.floor(Math.random() * locationList.length)
  //     ];
  //     entity.location = `${newX},${newY}`;
  //   }
  // });

  // Randomize some heroes
  Object.keys(newRegion.heroes).forEach(heroID => {
    if (Math.random() > 0.5) {
      const hero = newRegion.heroes[heroID];
      const [newX, newY] = locationList[
        Math.floor(Math.random() * locationList.length)
      ];
      hero.location = `${newX},${newY}`;
    }
  });

  firebase.database().ref(`regions/${regionID}`).update(newRegion);
};

export default class RegionProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      mapEntry: null,
    };
  }

  componentDidMount() {
    const { regionID, visible } = { ...this.props };

    if (regionID && visible) {
      this.bindFirebase(regionID);
    }

    buildRegion(this.props);

    // this.timer = setInterval(() => {
    //   randomizeRegion(this.props, this.state.region);
    // }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    const { regionID, visible } = { ...this.props };

    if (nextProps.regionID !== regionID) {
      if (this.firebaseRefs.player) {
        this.unbind("region");
      }
      if (nextProps.regionID && nextProps.visible) {
        this.bindFirebase(nextProps.regionID);
      }
    }
  }

  bindFirebase = regionID => {
    this.bindAsObject(
      firebase.database().ref(`regions/${regionID}`),
      "region",
      function(error) {
        console.log("Region subscription cancelled:");
        console.log(error);
        this.setState({ region: null });
      }.bind(this)
    );

    this.bindAsObject(
      firebase.database().ref(`map/regions/${regionID}`),
      "mapEntry",
      function(error) {
        console.log("Region map entry subscription cancelled:");
        console.log(error);
        this.setState({ mapEntry: null });
      }.bind(this)
    );
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { coordinates, angle, position, visible } = { ...this.props };
    const { region, mapEntry } = { ...this.state };

    return (
      <RegionContainer position={position}>
        <Region
          {...region}
          {...mapEntry}
          visible={region && mapEntry && visible}
          angle={angle}
          locationList={locationList}
          regionSeed={maths.getSeed([coordinates[0], coordinates[1]])}
        />
      </RegionContainer>
    );
  }
}

reactMixin(RegionProvider.prototype, reactFire);
