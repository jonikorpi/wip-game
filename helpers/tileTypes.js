import maths from "../helpers/maths.js";

let tiles = {
  water: {
    name: "Water",
    rarity: 1,
    impassable: null,
    walkable: null,
    sailable: true,
    difficult: null,
    axis1type: "water",
    axis1max: 10,
    axis1min: 10,
    axis1upgrade: null,
    axis1downgrade: "shoal",

    axis2type: "heat",
    axis2max: 10,
    axis2min: 10,
    axis2upgrade: "shoal",
    axis2downgrade: "ice",
    onChange: null,
    onSpawn: null,
    onDeath: null,
  },

  shoal: {
    name: "Shoal",
    rarity: 1,
    impassable: null,
    walkable: null,
    sailable: true,
    difficult: true,
    axis1type: "water",
    axis1max: 10,
    axis1min: 10,
    axis1upgrade: "water",
    axis1downgrade: "plains",

    axis2type: "heat",
    axis2max: 10,
    axis2min: 10,
    axis2upgrade: "plains",
    axis2downgrade: "ice",
    onChange: null,
    onSpawn: null,
    onDeath: null,
  },

  plains: {
    name: "Plains",
    rarity: 1,
    impassable: null,
    walkable: true,
    sailable: null,
    difficult: null,
    axis1type: "water",
    axis1max: 10,
    axis1min: 10,
    axis1upgrade: "wetland",
    axis1downgrade: "shoal",

    axis2type: "heat",
    axis2max: 10,
    axis2min: 10,
    axis2upgrade: "plains",
    axis2downgrade: "tundra",
    onChange: null,
    onSpawn: null,
    onDeath: null,
  },
};

Object.keys(tiles).forEach(tileType => {
  tiles[tileType].type = tileType;
});

export default {
  tiles: tiles,

  getRandomTile: (seed = 1) => {
    const tileKeys = Object.keys(tiles);
    const tileKey =
      tileKeys[Math.floor(maths.random(1, seed) * tileKeys.length)];
    return tiles[tileKey];
  },
};
