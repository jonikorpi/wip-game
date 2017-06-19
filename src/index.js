import React from "react";
import ReactDOM from "react-dom";

import Game from "./components/Game";

import registerServiceWorker from "./registerServiceWorker";
import "./reset.css";
import "./game.css";

ReactDOM.render(<Game />, document.getElementById("root"));
registerServiceWorker();
