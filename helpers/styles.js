const waterHue = 200;
const groundHue = waterHue - 180;

export default {
  water: `hsl(${waterHue}, 0%, 41.4%)`,
  black: `hsl(${groundHue}, 0%, 0%)`,
  white: `white`,
  rock: `hsl(${groundHue}, 0%, 33.333%)`,
  wave: `hsl(${waterHue}, 0%, 76.4%)`,
  reflection: `hsl(${waterHue}, 0%, 33.333%)`,
};
