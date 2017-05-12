import React, { Component } from "react";
// import Grid from "react-virtualized/dist/commonjs/Grid";
// import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
// import accessibilityOverscanIndicesGetter
//   from "react-virtualized/dist/commonjs/Grid/accessibilityOverscanIndicesGetter";
import ReactList from "react-list";

import Cell from "./components/Cell.js";

import styles from "./helpers/styles.js";
import hex from "./helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

const cellsPerRow = 100;
const cellsPerColumn = 100;

// const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
const cellRenderer = (columnIndex, rowIndex, key) => {
  return (
    <Cell
      key={key}
      cellX={columnIndex - rowIndex * 0.5}
      cellY={rowIndex}
      //style={style}
      style={{
        position: "relative",
        width: hex.cellWidth + hex.unit,
        height: hex.cellHeight + hex.unit,
        display: "inline-block",
        //left: columnIndex * hex.cellWidth + hex.unit,
        //top: rowIndex * hex.cellHeight + hex.unit,
      }}
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
      <div className="game">

        {/*<AutoSizer>
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
        </AutoSizer>*/}

        <ReactList
          type="uniform"
          //useTranslate3d={true}
          initialIndex={cellsPerColumn / 2}
          length={cellsPerColumn}
          pageSize={3}
          itemsRenderer={(items, ref) => (
            <div className="row" ref={ref}>{items}</div>
          )}
          itemRenderer={(row, key) => (
            <ReactList
              key={key}
              axis="x"
              type="uniform"
              //useTranslate3d={true}
              length={cellsPerRow}
              initialIndex={cellsPerRow / 2}
              pageSize={3}
              itemRenderer={(column, key) =>
                cellRenderer(column, cellsPerRow * row, key)}
            />
          )}
        />
      </div>
    );
  }
}
