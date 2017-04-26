import React, { Component } from "react";
import { Collection, AutoSizer } from "react-virtualized";

import Layout from "../components/Layout.js";
import FirebaseContainer from "../components/FirebaseContainer.js";

import variables from "../helpers/variables.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

const cellRenderer = ({ index, key, style }) => {
  return <FirebaseContainer key={key} index={index} style={style} />;
};

const cellSizeAndPositionGetter = ({ index }) => {
  return {
    height: 100,
    width: 100,
    x: index * 100,
    y: index * 100,
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
          Hello world

          <AutoSizer>
            {({ height, width }) => (
              <Collection
                cellRenderer={cellRenderer}
                cellSizeAndPositionGetter={cellSizeAndPositionGetter}
                height={height}
                width={width}
                className="scroller"
                cellCount={1000}
                scrollToCell={500}
                scrollToAlignment="center"
              />
            )}
          </AutoSizer>
        </div>
      </Layout>
    );
  }
}
