import React, { Component } from "react";
import { Collection, AutoSizer } from "react-virtualized";

import Layout from "../components/Layout.js";
import FirebaseContainer from "../components/FirebaseContainer.js";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

const hexesPerRow = 10;
const hexesPerColumn = 10;
const totalHexes = hexesPerRow * hexesPerColumn;

const cellRenderer = ({ index, key, style }) => {
  return <FirebaseContainer key={key} index={index} style={style} />;
};

const cellSizeAndPositionGetter = ({ index }) => {
  const x = index % hexesPerRow;
  const y = Math.floor(index / hexesPerRow);

  const coordinates = hex.pixelCoordinates([x, y]);

  return {
    height: hex.height,
    width: hex.width,
    x: coordinates[0],
    y: coordinates[1],
  };
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static async getInitialProps({ req }) {
    return {};
  }

  render() {
    return (
      <Layout>
        <div className="home">
          <style jsx global>{`
            .home {
              height: 100vh;
            }
          `}</style>

          <AutoSizer>
            {({ height, width }) => (
              <Collection
                cellRenderer={cellRenderer}
                cellSizeAndPositionGetter={cellSizeAndPositionGetter}
                height={height}
                width={width}
                className="scroller"
                cellCount={totalHexes}
                scrollToCell={totalHexes / 2}
                scrollToAlignment="center"
              />
            )}
          </AutoSizer>
        </div>
      </Layout>
    );
  }
}
