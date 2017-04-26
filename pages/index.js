import React, { Component } from "react";
import { Collection, AutoSizer } from "react-virtualized";
import NoSSR from "react-no-ssr";

import Layout from "../components/Layout.js";
import Cell from "../components/Cell.js";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

const cellsPerRow = 100;
const cellsPerColumn = 100;
const totalHexes = cellsPerRow * cellsPerColumn;

const cellRenderer = ({ index, key, style }) => {
  return <Cell key={key} index={index} style={style} />;
};

const cellSizeAndPositionGetter = ({ index }) => {
  const hexesPerRow = 10;
  const hexesPerColumn = 10;
  const x = index % cellsPerRow;
  const y = Math.floor(index / cellsPerRow);

  const coordinates = hex.pixelCoordinates([x, y]);

  return {
    width: hexesPerRow * hex.width,
    height: hexesPerColumn * hex.height * 0.75 + hex.size * 0.5,
    x: hexesPerRow * coordinates[0],
    y: hexesPerColumn * coordinates[1],
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

          <NoSSR>
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
                  horizontalOverscanSize={1}
                  verticalOverscanSize={1}
                />
              )}
            </AutoSizer>
          </NoSSR>
        </div>
      </Layout>
    );
  }
}
