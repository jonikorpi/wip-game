import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game";
import "./reset.css";
import "./base.css";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

if (dev) {
  window.Perf = require("react-addons-perf");
  window.Perf.start();

  setTimeout(() => {
    window.Perf.printInclusive();
    window.Perf.printWasted();
  }, 5000);
}

ReactDOM.render(<Game />, document.getElementById("game"));
