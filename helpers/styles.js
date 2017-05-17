const mapHue = 30;
const waterHue = 200;

export default {
  water: `hsl(${waterHue}, 76.4%, 41.4%)`,
  black: "black",
  white: `white`,
  ground: "black",
  rock: "#555",
  wave: `hsl(${waterHue}, 100%, 85.4%)`,
  reflection: `hsl(${waterHue}, 76.4%, 33%)`,

  map: {
    water: `hsl(${mapHue}, 14.6%, 23.6%)`,
    black: `hsl(${mapHue}, 14.6%, 14.6%)`,
    white: `hsl(${mapHue}, 9%, 76.4%)`,
    rock: `hsl(${mapHue}, 9%, 33.333%)`,
    wave: `hsl(${mapHue}, 14.6%, 61.8%)`,
    reflection: `hsl(${mapHue}, 23.6%, 20%)`,
  },
};
