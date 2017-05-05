export default {
  water: {
    name: "Water",
    rarity: 1,
    impassable: null,
    sailable: true,
    difficult: null,
    axes: {
      water: {
        max: 10,
        min: 10,
        upgrade: null,
        downgrade: "shoal",
      },
      heat: {
        max: 10,
        min: 10,
        upgrade: "shoal",
        downgrade: "ice",
      },
    },
    onChange: null,
    onSpawn: null,
    onDeath: null,
  },

  shoal: {
    name: "Shoal",
    rarity: 1,
    impassable: null,
    sailable: true,
    difficult: true,
    axes: {
      water: {
        max: 10,
        min: 10,
        upgrade: "water",
        downgrade: "plains",
      },
      heat: {
        max: 10,
        min: 10,
        upgrade: "plains",
        downgrade: "ice",
      },
    },
    onChange: null,
    onSpawn: null,
    onDeath: null,
  },

  plains: {
    name: "Plains",
    rarity: 1,
    impassable: null,
    sailable: null,
    difficult: null,
    axes: {
      water: {
        max: 10,
        min: 10,
        upgrade: "wetland",
        downgrade: "shoal",
      },
      heat: {
        max: 10,
        min: 10,
        upgrade: "plains",
        downgrade: "tundra",
      },
    },
    onChange: null,
    onSpawn: null,
    onDeath: null,
  },
};
