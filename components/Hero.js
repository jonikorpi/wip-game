import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const Hero = ({ heightRatio, ...hero }) => {
  const [x, y] = hero.location.split(",");
  const pixelCoordinates = hex.pixelCoordinates([x, y]);
  const viewBox = `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`;

  return (
    <div
      className="location"
      style={{
        left: `${(styles.padding + pixelCoordinates[0] - hex.width) / styles.width * 100}%`,
        top: `${(styles.padding + pixelCoordinates[1] - hex.height) / styles.height * 100}%`,
      }}
    >
      <style jsx global>{`
          .location {
            position: absolute;
            width: ${hex.width / styles.width * 300}%;
            height: ${hex.height / styles.height * 300}%;
          }
        `}</style>

      <SVG viewBox={viewBox} style={{ zIndex: y + 10 }}>
        <Layer heightRatio={heightRatio}>
          <text fill={styles.rock} x={hex.width / 2} y={hex.height / 2}>
            H
          </text>
        </Layer>
        <Layer heightRatio={heightRatio} zOffset={-2}>
          <text fill={styles.white} x={hex.width / 2} y={hex.height / 2}>
            H
          </text>
        </Layer>
      </SVG>
    </div>
  );
};

export default Hero;
