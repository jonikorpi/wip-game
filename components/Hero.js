import React from "react";

import Layer from "../components/Layer.js";
import SVG from "../components/SVG.js";

import hex from "../helpers/hex.js";
import styles from "../helpers/styles.js";

const Hero = ({ heightRatio, ...hero }) => {
  const [x, y] = hero.location.split(",");
  const pixelCoordinates = hex.pixelCoordinates([+x, +y]);
  const viewBox = `${-hex.width} ${-hex.height} ${hex.width * 3} ${hex.height * 3}`;
  const transform = `translate3d(
    ${pixelCoordinates[0] / hex.width * 100 / 3}%,
    ${pixelCoordinates[1] / hex.height * 100 / 3}%,
    0
  )`;

  return (
    <div
      className="hero"
      style={{
        WebkitTransform: transform,
        transform: transform,
      }}
    >
      <style jsx global>{`
        .hero {
          position: absolute;
          left: ${(styles.padding - hex.width) / styles.width * 100}%;
          top: ${(styles.padding - hex.height) / styles.height * 100}%;
          width: ${hex.width / styles.width * 300}%;
          height: ${hex.height / styles.height * 300}%;
          transition: transform 2s linear;
          will-change: transform;
          backface-visibility: hidden;
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
