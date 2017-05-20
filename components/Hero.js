import React from "react";

import Entity from "../components/Entity";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";

const Hero = ({ x, y }) => <Entity type="hero" x={x} y={y} />;

export default Hero;
