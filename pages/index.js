import React, { Component } from "react";
import Grid from "react-virtualized/dist/commonjs/Grid";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import accessibilityOverscanIndicesGetter
  from "react-virtualized/dist/commonjs/Grid/accessibilityOverscanIndicesGetter";

import Layout from "../components/Layout.js";
import Cell from "../components/Cell.js";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

const cellsPerRow = 200;
const cellsPerColumn = 150;

const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
  return (
    <Cell
      key={key}
      cellX={columnIndex - rowIndex * 0.5}
      cellY={rowIndex}
      style={style}
    />
  );
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
            {({ height, width }) => {
              const units = {
                vmax: (height >= width ? height : width) / 100,
                vmin: (height <= width ? height : width) / 100,
                px: 1,
              };

              return (
                <Grid
                  cellRenderer={cellRenderer}
                  columnWidth={hex.cellWidth * units[hex.unit]}
                  rowHeight={hex.cellHeight * units[hex.unit]}
                  height={height}
                  width={width}
                  className="scroller"
                  rowCount={cellsPerColumn}
                  columnCount={cellsPerRow}
                  scrollToColumn={cellsPerRow / 2}
                  scrollToRow={cellsPerColumn / 2}
                  //scrollLeft={}
                  //scrollTop={}
                  scrollToAlignment="center"
                  overscanRowCount={0}
                  overscanColumnCount={0}
                  overscanIndicesGetter={accessibilityOverscanIndicesGetter}
                  scrollingResetTimeInterval={50}
                />
              );
            }}
          </AutoSizer>
        </div>
      </Layout>
    );
  }
}
